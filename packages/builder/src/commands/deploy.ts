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

  execSync(concatCommand('npx lcap deploy zip.tgz', config));
  logger.success(`update success ${tgz}`);
  // 删除zip.tgz
  fs.unlinkSync('zip.tgz');
}

function deployImages(rootPath, config: LcapCliConfig) {
  const imageFloders: string[] = [];
  const imageFilePaths = glob.sync(['src/**/screenshots/*', 'src/**/drawings/*', 'src-vusion/**/screenshots/*', 'src-vusion/**/drawings/*'], { cwd: rootPath, absolute: true });

  imageFilePaths.forEach((filePath) => {
    const deployPath = filePath.substring(rootPath.length + 1, filePath.lastIndexOf('/'));

    if (!imageFloders.includes(deployPath)) {
      imageFloders.push(deployPath);
    }
  });

  imageFloders.forEach((folder) => {
    execSync(concatCommand(`npx lcap deploy ${folder}`, config));
    logger.success(`update success ${folder}`);
  });
}

export default (rootPath, { images, ...commandArgs }) => {
  const lcapCliConfig: LcapCliConfig = {
    ...commandArgs,
  };

  const configPath = path.resolve(rootPath, '.lcaprc');
  if (fs.existsSync(configPath)) {
    const config = fs.readJSONSync(configPath);
    Object.keys(config).forEach((key) => {
      if (config[key] && !lcapCliConfig[key]) {
        lcapCliConfig[key] = config[key];
      }
    });
  }

  deployTgz(rootPath, lcapCliConfig);

  execSync(concatCommand('npx lcap deploy dist-theme', lcapCliConfig));

  const manifestPath = path.resolve(rootPath, 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    execSync(concatCommand('npx lcap deploy manifest.json', lcapCliConfig));
  }

  if (images) {
    deployImages(rootPath, lcapCliConfig);
  }

  logger.success('Deploy successed!');
};
