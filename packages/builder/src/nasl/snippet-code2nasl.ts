import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import transformJsx2Nasl from './transform-jsx2nasl';

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
