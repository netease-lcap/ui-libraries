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
  forkComponent,
  setAllAPI,
} from '../overload';

const semver = require('semver');

function transformAPITsFile(context: OverloadComponentContext) {
  const filePath = path.resolve(context.componentFolderPath, 'api.ts');
  let code = fs.readFileSync(filePath, 'utf-8').toString();
  code = transformAPITs(code, context);
  fs.writeFileSync(filePath, code, 'utf-8');
}

function getBaseIdeVersion(context: OverloadComponentContext) {
  if (context.libInfo.name === '@lcap/element-ui') {
    return '3.13';
  }

  return '3.10';
}

function resetIdeVersion(context: OverloadComponentContext) {
  const pkgPath = path.resolve(context.rootPath, 'package.json');
  const pkg = fs.readJSONSync(pkgPath);
  const baseIdeVersion = getBaseIdeVersion(context);
  if (!pkg.lcapIdeVersion || !semver.valid(`${pkg.lcapIdeVersion}.0`) || semver.lt(`${pkg.lcapIdeVersion}.0`, `${baseIdeVersion}.0`)) {
    pkg.lcapIdeVersion = baseIdeVersion;
    fs.writeJSONSync(pkgPath, pkg, { spaces: 2 });
  }
}

export default async (rootPath, { fork, component, prefix }) => {
  try {
    const context = getOverloadComponentContext(rootPath, { component, prefix, fork });
    logger.start('开始执行重载组件');
    await copyFiles(context);
    await transformAPITsFile(context);
    await generateBlockFile(context);
    await generateComponentFile(context);
    await generateThemeFile(context);
    await forkComponent(context);
    await setAllAPI(context);
    resetIdeVersion(context);
    logger.success('重载组件成功');
  } catch (e) {
    logger.error(e);
  }
};
