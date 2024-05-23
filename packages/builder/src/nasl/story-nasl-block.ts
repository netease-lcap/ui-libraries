import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { transformTSX2Nasl } from '../ts2nasl';
import { getNodeCode } from '../utils/babel-utils';

const getBlocksFromStory = (code, framework) => {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  const blocks: any[] = [];

  traverse(ast, {
    VariableDeclarator(path) {
      const hasExporedName = path.findParent((p) => p.type === 'ExportNamedDeclaration');
      if (
        !hasExporedName || !path.node.id || !path.node.init
        || path.node.id.type !== 'Identifier'
        || path.node.init.type !== 'ObjectExpression'
        || !path.node.init.properties
        || path.node.init.properties.length === 0) {
        return;
      }

      const block = {
        name: path.node.id.name,
        template: '',
      };

      if (framework.startsWith('vue')) {
        let nameSeted = false;
        path.traverse({
          ObjectProperty: (p) => {
            if (p.node.key && p.node.key.type === 'Identifier' && p.node.key.name === 'name' && p.node.value && p.node.value.type === 'StringLiteral' && !nameSeted) {
              block.name = p.node.value.value;
              nameSeted = true;
            } else if (p.node.key && p.node.key.type === 'Identifier' && p.node.key.name === 'template') {
              // eslint-disable-next-line no-eval
              block.template = `<template>${eval(getNodeCode(p.node.value))}</template>`;
            } else if (nameSeted && block.template) {
              p.stop();
            }
          },
        });
      } else {
        path.traverse({
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

            block.template = JSON.stringify(transformTSX2Nasl(p.node));
            p.skip();
          },
        });
      }

      blocks.push(block);
    },
  });

  return blocks;
};

export default getBlocksFromStory;
