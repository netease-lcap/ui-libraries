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
    const dir = path.join(rootPath, componentsPath, component.name);
    let { name } = component;
    if (!fs.existsSync(dir)) {
      name = `${name}.vue`;
    }

    const command = `npx lcap deploy ${componentsPath}/${name}/screenshots --platform ${platform}`;
    const commandDrawings = `npx lcap deploy ${componentsPath}/${name}/drawings --platform ${platform}`;

    // logger.info('exect command: ', command);
    // logger.info('exect command: ', commandDrawings);
    api.cli.execSync(command);
    api.cli.execSync(commandDrawings);
    api.cli.done(name);
  });
}

export default (config, platform) => {
  const {
    rootPath,
    componentsPath,
    components,
  } = config;

  logger.done('Start deploy');
  deployTgz(rootPath, platform);
  deployImages(components, rootPath, componentsPath, platform);
  logger.done('Deploy successed!');
};
