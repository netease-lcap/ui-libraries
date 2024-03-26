import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import transformJsx2Nasl from './transform-jsx2nasl';

const getBlocksFromStory = (code) => {
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
        || path.node.init.type !== 'ObjectExpression'
        || !path.node.init.properties
        || path.node.init.properties.length === 0) {
        return;
      }

      const block = {
        name: path.node.id.name,
        template: '',
      };

      path.traverse({
        ObjectProperty: (p) => {
          if (p.node.key && p.node.key.name === 'name' && p.node.value && p.node.value.type === 'StringLiteral') {
            block.name = p.node.value.value;
            p.skip();
          }
        },
        JSXElement: (p) => {
          const inRenderProps = p.findParent((parentPath) => parentPath.type === 'ObjectProperty' && parentPath.node.key && parentPath.node.key.name === 'render');
          if (inRenderProps && ['ReturnStatement', 'ArrowFunctionExpression'].indexOf(p.parent.type) === -1) {
            return;
          }

          block.template = transformJsx2Nasl(p.node);
          p.skip();
        },
      });

      blocks.push(block);
    },
  });

  return blocks;
};

export default getBlocksFromStory;
