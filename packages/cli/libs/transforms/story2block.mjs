import * as parser from '@babel/parser';
import babelTraverse from '@babel/traverse';
import reactJSX2VueTemplate from '../utils/reactJSX2VueTemplate.mjs';

const traverse = babelTraverse.default;

const getBlocksFromStory = (code) => {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  const blocks = [];

  traverse(ast, {
    VariableDeclarator(path) {
      const hasExporedName = path.findParent((p) => p.type === 'ExportNamedDeclaration');

      if (!hasExporedName || !path.node.id) {
        return;
      }

      const block = {
        name: path.node.id.name,
        template: '',
      };

      path.traverse({
        ReturnStatement: (n) => {
          if (n.node.argument.type !== 'JSXElement') {
            return;
          }

          block.template = reactJSX2VueTemplate(n.node.argument);
        },
      });

      blocks.push(block);
    },
  });

  return blocks;
};

export default getBlocksFromStory;
