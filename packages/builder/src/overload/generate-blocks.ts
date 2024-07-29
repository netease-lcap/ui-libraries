/* eslint-disable quotes */
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import type { ExportNamedDeclaration } from '@babel/types';
import generate from '@babel/generator';
import glob from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import { OverloadComponentContext } from './context';
import { replaceTagName } from './utils';
import { LCAP_UI_PACKAGE_NAME } from './constants';

function getBlockCodeFromData(context: OverloadComponentContext) {
  let blocks = [{
    code: `<${context.tagName}></${context.tagName}>`,
    title: '基本用法',
  }];

  if (context.naslUIConfig.blocks && context.naslUIConfig.blocks.length > 0) {
    blocks = [...context.naslUIConfig.blocks];
  }

  const blockCodes = blocks.map((block, i) => {
    let code = replaceTagName(block.code, context.naslUIConfig.kebabName, context.tagName).trim();
    if (code.startsWith('<template>') && code.endsWith('</template>')) {
      code = code.substring('<template>'.length, code.length - '</template>'.length).trim();
    }
    return [
      `export const Block${i + 1} = {`,
      `  name: '${block.title || '基本用法'}',`,
      '  render: () => ({',
      `    template: \`${code}\`,`,
      '  }),',
      '};',
    ].join('\n');
  });

  return `import Component from '../index';

export default {
  id: '${context.tagName}-blocks',
  title: '组件列表/${context.name}/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

${blockCodes.join('\n\n')}
`;
}

function getBlockInfos(code, context: OverloadComponentContext) {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  const blocks: any[] = [];
  const waitImports: string[] = [];
  traverse(ast, {
    VariableDeclarator(bpath) {
      const hasExporedName = bpath.findParent((p) => p.type === 'ExportNamedDeclaration');
      if (
        !hasExporedName || !bpath.node.id || !bpath.node.init
        || bpath.node.id.type !== 'Identifier'
        || bpath.node.init.type !== 'ObjectExpression'
        || !bpath.node.init.properties
        || bpath.node.init.properties.length === 0) {
        return;
      }

      const block: any = {
        name: bpath.node.id.name,
        ast: null,
      };

      bpath.traverse({
        ObjectProperty: (p) => {
          if (p.node.key && p.node.key.type === 'Identifier' && p.node.key.name === 'name' && p.node.value && p.node.value.type === 'StringLiteral') {
            block.name = p.node.value.value;
            p.skip();
          }
        },
        JSXElement: (p) => {
          const inRenderProps = p.findParent((parentPath: any) => parentPath.type === 'ObjectProperty' && parentPath.node.key && parentPath.node.key.name === 'render');
          if (inRenderProps && ['ReturnStatement', 'ArrowFunctionExpression'].indexOf(p.parent.type) === -1) {
            return;
          }

          block.ast = p.node;
          p.skip();
        },
      });

      blocks.push(block);
    },
    JSXElement(pt) {
      if (pt.node.openingElement.name.type !== 'JSXIdentifier') {
        return;
      }

      const tagName = pt.node.openingElement.name.name;
      if (tagName === context.naslUIConfig.name) {
        pt.node.openingElement.name.name = context.tagName;
        if (pt.node.closingElement && pt.node.closingElement.name.type === 'JSXIdentifier') {
          pt.node.closingElement.name.name = context.tagName;
        }
      } else if (
        waitImports.indexOf(tagName) === -1
        && context.findNaslUIConfig(tagName)
      ) {
        waitImports.push(tagName);
      }
    },
  });

  return {
    blocks,
    waitImports,
  };
}

function getBlockCodeFromFile(filePath, context: OverloadComponentContext) {
  const tsCode = fs.readFileSync(filePath, 'utf-8');
  const { blocks, waitImports } = getBlockInfos(tsCode, context);
  const BASE_STORIES_CODE = [
    `import React from 'react';${waitImports.length > 0 ? `\nimport { ${waitImports.join(', ')} } from '${LCAP_UI_PACKAGE_NAME}';` : ''}`,
    `import ${context.name} from '../index';`,
    `export default {`,
    `  id: '${context.name}-Blocks',`,
    `  title: '组件列表/${context.name}/内置区块',`,
    `  component: ${context.name},`,
    `  parameters: {`,
    `    layout: 'centered',`,
    `  },`,
    `};`,
    '',
  ].join('\n');
  const baseAST = parser.parse(BASE_STORIES_CODE, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  baseAST.program.body.push(
    ...blocks.map((block, i) => {
      return {
        type: 'ExportNamedDeclaration',
        specifiers: [],
        declaration: {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [{
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: `Block${i + 1}`,
            },
            init: {
              type: 'ObjectExpression',
              properties: [{
                type: 'ObjectProperty',
                key: {
                  type: 'Identifier',
                  name: 'name',
                },
                value: {
                  type: 'StringLiteral',
                  value: block.name,
                  extra: {
                    rawValue: block.name,
                    raw: `'${block.name}'`,
                  },
                },
                shorthand: false,
                computed: false,
              }, {
                type: 'ObjectProperty',
                key: {
                  type: 'Identifier',
                  name: 'render',
                },
                value: {
                  type: 'ArrowFunctionExpression',
                  generator: false,
                  async: false,
                  params: [],
                  body: block.ast,
                },
                shorthand: false,
                computed: false,
              }],
            },
          }],
        },
      } as ExportNamedDeclaration;
    }),
  );

  return generate(baseAST).code;
}

export function generateBlockFile(context: OverloadComponentContext) {
  if (context.framework.startsWith('vue2')) {
    const content = getBlockCodeFromData(context);
    fs.writeFileSync(path.resolve(context.componentFolderPath, 'stories/block.stories.js'), content, 'utf-8');
    return;
  }
  const storyFilePath = glob.sync('stories/block.stories.{tsx,jsx}', { cwd: context.pkgComponentFolderPath, absolute: true })[0];
  if (!storyFilePath) {
    return;
  }

  const content = getBlockCodeFromFile(storyFilePath, context);
  const tsxFilePath = path.resolve(context.componentFolderPath, 'stories/block.stories.tsx');
  if (fs.existsSync(tsxFilePath)) {
    fs.unlinkSync(tsxFilePath);
  }

  fs.writeFileSync(path.resolve(context.componentFolderPath, 'stories/block.stories.jsx'), content, 'utf-8');
}
