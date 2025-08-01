import path from 'path';
import fs from 'fs-extra';
import prettier from 'prettier';

export async function formatCode(code: string, parser: any = 'babel') {
  let options: any = {
    printWidth: 120,
    tabWidth: 2,
    useTabs: false,
    singleQuote: true,
    vueIndentScriptAndStyle: false,
    trailingComma: 'all',
    bracketSpacing: true,
    bracketSameLine: true,
    arrowParens: 'always',
    semi: true,
  };

  const configFilePath = path.resolve(process.cwd(), '.prettierrc');

  if (fs.existsSync(configFilePath)) {
    const customOptions = await prettier.resolveConfig(configFilePath, {
      editorconfig: fs.existsSync('.editorconfig'),
    });

    if (customOptions) {
      options = customOptions;
    }
  }

  return prettier.format(code, {
    ...options,
    parser,
  });
}
