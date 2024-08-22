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
} from '../overload';

const semver = require('semver');

function transformAPITsFile(context: OverloadComponentContext) {
  const filePath = path.resolve(context.componentFolderPath, 'api.ts');
  let code = fs.readFileSync(filePath, 'utf-8').toString();
  code = transformAPITs(code, context);
  fs.writeFileSync(filePath, code, 'utf-8');
}

function resetIdeVersion(context: OverloadComponentContext) {
  const pkgPath = path.resolve(context.rootPath, 'package.json');
  const pkg = fs.readJSONSync(pkgPath);
  if (!pkg.lcapIdeVersion || !semver.valid(`${pkg.lcapIdeVersion}.0`) || semver.lt(`${pkg.lcapIdeVersion}.0`, '3.10.0')) {
    pkg.lcapIdeVersion = '3.10';
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
    resetIdeVersion(context);
    logger.success('重载组件成功');
  } catch (e) {
    logger.error(e);
  }
};
