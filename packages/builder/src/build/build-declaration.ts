/* eslint-disable no-param-reassign */
/* eslint-disable global-require */
import * as babel from '@babel/core';
import * as babelTypes from '@babel/types';
import generate from '@babel/generator';
import traverse from '@babel/traverse';
import fs from 'fs-extra';
import type { ViewComponentDeclaration } from '@nasl/types/nasl.ui.ast';
import path from 'path';
import { execSync } from '../utils/exec';
import logger from '../utils/logger';
import { LcapBuildOptions } from './types';
import { getNodeCode } from '../utils/babel-utils';

function putComponentMap(components: ViewComponentDeclaration[], componentMap: Record<string, ViewComponentDeclaration> = {}) {
  if (!Array.isArray(components)) {
    return;
  }

  components.forEach((comp) => {
    componentMap[comp.name] = comp;

    if (comp.children && comp.children.length > 0) {
      putComponentMap(comp.children, componentMap);
    }
  });
}

function getDtsPath(options: LcapBuildOptions) {
  const isExtension = options.type === 'extension';
  const tsPath = isExtension ? 'nasl.extension.d.ts' : `${options.destDir}/nasl.ui.d.ts`;
  return path.resolve(options.rootPath, tsPath);
}

async function getMetaInfo(options: LcapBuildOptions) {
  const isExtension = options.type === 'extension';
  const tsCode = await fs.readFile(getDtsPath(options), 'utf-8');
  const componentMap: Record<string, ViewComponentDeclaration> = {};

  if (isExtension) {
    const moduleJSON = fs.readJSONSync(path.resolve(options.rootPath, 'nasl.extension.json'), 'utf-8');
    if (moduleJSON.frontends && moduleJSON.frontends.length > 0) {
      moduleJSON.frontends.forEach((fe) => {
        if (Array.isArray(fe.viewComponents)) {
          putComponentMap(fe.viewComponents, componentMap);
        }
      });
    }
  } else {
    const componentList = fs.readJSONSync(path.resolve(options.rootPath, options.destDir, 'nasl.ui.json'), 'utf-8');
    putComponentMap(componentList, componentMap);
  }

  return {
    code: tsCode,
    componentMap,
  };
}

function getBlocks(title: string, description: string) {
  const blocks: string[] = [];

  if (title && title !== 'undefined') {
    blocks.push(` * ${title}`);
  }

  if (description && description !== 'undefined') {
    blocks.push(` * ${description}`);
  }

  return blocks;
}

function transformTsCode(tsCode: string, componentMap: Record<string, ViewComponentDeclaration>) {
  const ast = babel.parse(tsCode, {
    filename: 'result.ts',
    presets: [require('@babel/preset-typescript')],
    plugins: [
      [require('@babel/plugin-proposal-decorators'), { legacy: true }],
      // 'babel-plugin-parameter-decorator'
    ],
    rootMode: 'root',
    root: __dirname,
  }) as babelTypes.File;
  traverse(ast, {
    ClassDeclaration(np) {
      if (!np.node.id || np.node.id.type !== 'Identifier') {
        return;
      }

      const classNode = np.node as babelTypes.ClassDeclaration;
      if (np.parent.type !== 'ExportNamedDeclaration') {
        const exportAST: babelTypes.ExportNamedDeclaration = {
          type: 'ExportNamedDeclaration',
          specifiers: [],
          declaration: classNode,
        };
        np.replaceWith(exportAST);
      }

      const className = classNode.id?.name || '';
      const componentInfo = componentMap[className.endsWith('Options') ? className.replace(/Options$/, '') : className];
      if (!componentInfo) {
        return;
      }

      const superClassName = getNodeCode(classNode.superClass);
      if (superClassName.endsWith('ViewComponent')) {
        classNode.body.body.forEach((n) => {
          if (n.type === 'TSDeclareMethod' && n.kind === 'method' && n.key.type === 'Identifier') {
            const methodName = n.key.name;
            const methodInfo = componentInfo.methods.find((m) => m.name === methodName);

            if (methodInfo) {
              const blocks: string[] = getBlocks(methodInfo.title, methodInfo.description);
              if (blocks.length > 0) {
                n.leadingComments = [
                  {
                    type: 'CommentBlock',
                    value: `*\n${blocks.join('\n')}\n `,
                  },
                ];
              }
            }
          } else if (n.type === 'ClassProperty' && n.key.type === 'Identifier') {
            const propName = n.key.name;
            const propInfo = componentInfo.readableProps.find((p) => p.name === propName);
            if (propInfo) {
              const blocks: string[] = getBlocks(propInfo.title, propInfo.description || '');
              if (blocks.length > 0) {
                n.leadingComments = [
                  {
                    type: 'CommentBlock',
                    value: `*\n${blocks.join('\n')}\n `,
                  },
                ];
              }
            }
          }
        });
      } else if (superClassName.endsWith('ViewComponentOptions')) {
        classNode.body.body.forEach((n) => {
          if (n.type !== 'ClassProperty' || n.key.type !== 'Identifier') {
            return;
          }
          const propName = n.key.name;

          let propInfo: any = componentInfo.props.find((p) => p.name === propName);

          if (!propInfo && propName.startsWith('on')) {
            const eventName = propName.replace(/^on(\w+)/, ($0, $1) => {
              return $1.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            });
            propInfo = componentInfo.events.find((e) => e.name === eventName);
          } else if (!propInfo && propName.startsWith('slot')) {
            const slotName = propName.replace(/^slot(\w)/, (m, $1) => $1.toLowerCase());
            propInfo = componentInfo.slots.find((slot) => slot.name === slotName);
          }

          if (propInfo) {
            const blocks: string[] = getBlocks(propInfo.title, propInfo.description);
            if (blocks.length > 0) {
              n.leadingComments = [
                {
                  type: 'CommentBlock',
                  value: `*\n${blocks.join('\n')}\n `,
                },
              ];
            }
          }
        });
      }
    },
  });

  const { code } = generate(ast);
  return code;
}

export default async function buildDecalaration(options: LcapBuildOptions) {
  logger.start('开始编译 api.ts');
  execSync('npx tsc -p tsconfig.api.json');
  const { code, componentMap } = await getMetaInfo(options);
  if (code) {
    const dtsCode = transformTsCode(code, componentMap);
    fs.writeFileSync(getDtsPath(options), dtsCode);
  }

  logger.success('编译 api.ts 成功！');
}
