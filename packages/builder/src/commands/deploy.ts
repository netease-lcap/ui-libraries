import fs from 'fs-extra';
import path from 'path';
import glob from 'fast-glob';
import logger from '../utils/logger';
import { execSync } from '../utils/exec';

export interface LcapCliConfig {
  platform?: string;
  username?: string;
  password?: string;
  bucket?: string;
}

function concatCommand(command: string, config: LcapCliConfig) {
  const commands = [command];
  if (config.platform) {
    commands.push(`--platform ${config.platform}`);
  }

  if (config.bucket) {
    commands.push(`--bucket ${config.bucket}`);
  }

  if (config.username) {
    commands.push(`--username ${config.username}`);
  }

  if (config.password) {
    commands.push(`--password ${config.password}`);
  }

  return commands.join(' ');
}

function deployTgz(rootPath: string, config: LcapCliConfig) {
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

  const command = 'lcap deploy zip.tgz';
  execSync(concatCommand(command, config));
  logger.success(`update success ${tgz}`);
  // 删除zip.tgz
  fs.unlinkSync('zip.tgz');
}

function deployImages(rootPath, config: LcapCliConfig) {
  const imageFolderPaths = glob.sync([`${rootPath}/**/screenshots`, `${rootPath}/**/drawings`]);
  imageFolderPaths.forEach((imgFolderPath) => {
    const deployPath = imgFolderPath.substring(rootPath.length + 1);
    execSync(concatCommand(`npx lcap deploy ${deployPath}`, config));
    logger.success(`update success ${deployPath}`);
  });
}

export default (rootPath, platform) => {
  logger.start('Start deploy...');
  const lcapCliConfig: LcapCliConfig = {
    platform,
  };

  const configPath = `${rootPath}/.lcaprc`;
  if (fs.existsSync(`${rootPath}/.lcaprc`)) {
    const config = fs.readJSONSync(configPath);
    Object.keys(config).forEach((key) => {
      if (config[key] && !lcapCliConfig[key]) {
        lcapCliConfig[key] = config[key];
      }
    });
  }

  deployTgz(rootPath, lcapCliConfig);

  execSync(concatCommand('npx lcap deploy dist-theme', lcapCliConfig));

  deployImages(rootPath, lcapCliConfig);
  logger.success('Deploy successed!');
};
