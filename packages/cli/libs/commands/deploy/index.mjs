import path from 'path';
import fs from 'fs-extra';
import api from 'vusion-api';
import * as logger from '../../utils/logger.mjs';

function deployTgz(rootPath, platform) {
  const pkgInfo = fs.readJSONSync(path.join(rootPath, 'package.json'));
  const tgz = `${pkgInfo.name.replace('@lcap/', 'lcap-')}-${pkgInfo.version}.tgz`;
  // tgz 是否存在
  if (!fs.existsSync(tgz)) {
    logger.error(`${tgz} not found`);
    process.exit(1);
  }

  // zip.tgz 是否存在
  if (fs.existsSync('zip.tgz')) {
    fs.unlinkSync('zip.tgz');
  }

  // 复制tgz到zip.tgz
  fs.copyFileSync(tgz, 'zip.tgz');

  const command = `npx lcap deploy zip.tgz --platform ${platform}`;
  // logger.info('exect command: ', command);
  api.cli.execSync(command);
  api.cli.done(`${tgz}`);
  // 删除zip.tgz
  fs.unlinkSync('zip.tgz');
}

function deployImages(components, rootPath, componentsPath, platform) {
  components.forEach((component) => {
    let compPath = componentsPath;
    const dir = path.join(rootPath, compPath, component.name);
    const srcDir = path.join(rootPath, 'src', component.name);
    let { name } = component;

    if (!fs.existsSync(dir)) {
      // 兼容 mobile-ui
      if (fs.existsSync(srcDir)) {
        compPath = 'src';
      } else {
        name = `${name}.vue`;
      }
    }

    const command = `npx lcap deploy ${compPath}/${name}/screenshots --platform ${platform}`;
    const commandDrawings = `npx lcap deploy ${compPath}/${name}/drawings --platform ${platform}`;

    api.cli.execSync(command);
    api.cli.execSync(commandDrawings);
    api.cli.done(name);
  });
}

export default (config, platform) => {
  const {
    rootPath,
    componentsPath,
    destPath,
    components,
  } = config;

  logger.done('Start deploy');
  deployTgz(rootPath, platform);

  api.cli.execSync(`npx lcap deploy ${destPath} --platform ${platform}`);

  deployImages(components, rootPath, componentsPath, platform);
  logger.done('Deploy successed!');
};
