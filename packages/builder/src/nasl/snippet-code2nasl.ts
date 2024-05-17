import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { transformTSX2Nasl } from '../ts2nasl';

export default (code) => {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  let nasl = '';
  traverse(ast, {
    JSXElement: (p) => {
      nasl = JSON.stringify(transformTSX2Nasl(p.node));
      p.stop();
    },
  });

  return nasl || code;
};
