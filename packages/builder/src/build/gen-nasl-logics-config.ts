import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import glob from 'fast-glob';
import path from 'path';
import fs from 'fs-extra';
import transformFunc2NaslLogic from '../nasl/transform-func2nasl-logic';

export default async function getNaslExtensionConfig(rootPath) {
  const logicDir = path.join(rootPath, 'src/logics');
  // const pkgInfo = fs.readJSONSync(`${rootPath}/package.json`);
  const tsFiles = await glob(`${logicDir}/**/*.ts`);
  const logics: any[] = [];
  // const apiFuncCodes: string[] = [];

  tsFiles.forEach((tsPath) => {
    if (tsPath.endsWith('api.ts')) {
      return;
    }
    const code = fs.readFileSync(tsPath).toString();
    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    });

    traverse(ast, {
      ExportNamedDeclaration(p) {
        const logic = transformFunc2NaslLogic(p.node);
        if (logic) {
          logics.push(logic);
          // p.traverse({
          //   FunctionDeclaration(np) {
          //     np.node.generator = false;
          //     np.node.async = false;
          //     np.node.body.body = [];
          //     np.node.params = np.node.params.map((param) => {
          //       if (param.type === 'AssignmentPattern') {
          //         return param.left;
          //       }

          //       return param;
          //     }) as any[];

          //     let functionCode = getNodeCode(np.node);
          //     const endIndex = functionCode.lastIndexOf(' {}');

          //     if (endIndex !== -1) {
          //       functionCode = functionCode.substring(0, endIndex);
          //     }

          //     apiFuncCodes.push(`  export ${functionCode};`);
          //   },
          // });
        }
      },
    });
  });

  // fs.writeFileSync(`${logicDir}/api.ts`, [
  //   '/// <reference types="@nasl/types" />',
  //   `declare namespace extensions.${snakeCase(pkgInfo.name)}.logics {`,
  //   apiFuncCodes,
  //   '}',
  // ].flat().join('\n\n'));
  return logics;
}
