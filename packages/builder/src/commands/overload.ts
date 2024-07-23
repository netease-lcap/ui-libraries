import fs from 'fs-extra';
import path from 'path';
import logger from '../utils/logger';
import {
  getOverloadComponentContext,
  copyFiles,
  transformAPITs,
  OverloadComponentContext,
  generateBlockFile,
  generateComponentFile,
  generateThemeFile,
} from '../overload';

function transformAPITsFile(context: OverloadComponentContext) {
  const filePath = path.resolve(context.componentFolderPath, 'api.ts');
  let code = fs.readFileSync(filePath, 'utf-8').toString();
  code = transformAPITs(code, context);
  fs.writeFileSync(filePath, code, 'utf-8');
}

export default async (rootPath, { fork, component, prefix }) => {
  try {
    const context = getOverloadComponentContext(rootPath, { component, prefix, fork });
    await copyFiles(context);
    await transformAPITsFile(context);
    await generateBlockFile(context);
    await generateComponentFile(context);
    await generateThemeFile(context);
  } catch (e) {
    logger.error(e);
  }
};
