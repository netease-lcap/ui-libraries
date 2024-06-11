import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { kebabCase } from 'lodash';

export function getBlockInfos(code) {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  const blocks: any[] = [];
  let id = '';
  traverse(ast, {
    ExportDefaultDeclaration(path) {
      path.traverse({
        ObjectProperty: (p) => {
          if (p.node.key.type === 'Identifier' && p.node.key.name === 'id' && p.node.value.type === 'StringLiteral') {
            id = kebabCase(p.node.value.value);
            p.stop();
          } else if (p.node.key.type === 'Identifier' && p.node.key.name === 'title' && p.node.value.type === 'StringLiteral') {
            id = p.node.value.value.split('/').map((str) => str.toLowerCase()).join('-');
            p.stop();
          }
        },
      });
    },
  });

  traverse(ast, {
    VariableDeclarator(path) {
      const hasExporedName = path.findParent((p) => p.type === 'ExportNamedDeclaration');
      if (
        !hasExporedName || !path.node.id || !path.node.init
        || path.node.init.type !== 'ObjectExpression'
        || !path.node.init.properties
        || path.node.init.properties.length === 0) {
        return;
      }

      const nodeId = path.node.id.type === 'Identifier' ? path.node.id.name : '';
      const block = {
        name: nodeId,
        id: `${id}--${kebabCase(nodeId)}`,
      };

      path.traverse({
        ObjectProperty: (p) => {
          if (p.node.key && p.node.key.type === 'Identifier' && p.node.key.name === 'name' && p.node.value && p.node.value.type === 'StringLiteral') {
            block.name = p.node.value.value;
            p.skip();
          }
        },
      });

      blocks.push(block);
    },
  });

  return blocks;
}
