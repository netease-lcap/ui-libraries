import * as parser from '@babel/parser';
import babelTraverse from '@babel/traverse';
import reactJSX2NASL from '../utils/reactJSX2NASL.mjs';

const traverse = babelTraverse.default;

export default (code) => {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  let nasl = '';
  traverse(ast, {
    JSXElement: (p) => {
      nasl = reactJSX2NASL(p.node);
      p.stop();
    },
  });

  return nasl || code;
};
