import * as parser from '@babel/parser';
import babelTraverse from '@babel/traverse';
import { transformJsx2Nasl } from '@lcap/builder';

const traverse = babelTraverse.default;

export default (code) => {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  let nasl = '';
  traverse(ast, {
    JSXElement: (p) => {
      nasl = transformJsx2Nasl(p.node);
      p.stop();
    },
  });

  return nasl || code;
};
