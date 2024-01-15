import fs from 'fs-extra';
import path from 'path';
import { transform } from '../../transforms/naslTs2Json.js';
import * as logger from '../../utils/logger.mjs';

function hasImg(dir) {
  return fs.existsSync(path.join(dir, '0.png'));
}
function hasSvg(dir) {
  return fs.existsSync(path.join(dir, '0.svg'));
}

function getScreenShot(
  componentDir,
  component,
  libInfo,
  sourceDir,
  publicPath,
) {
  let screenShot = [];
  try {
    const screenShotPath = `${componentDir}/screenshots`;
    if (hasImg(screenShotPath)) {
      screenShot = fs
        .readdirSync(screenShotPath)
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
        .filter((filename) => filename.indexOf('.DS_Store') === -1);
      screenShot = screenShot.map((screen) => {
        const prefix = [publicPath, libInfo, sourceDir].join('/');
        return `${prefix}/${component.symbol}/screenshots/${screen}`;
      });
    }
  } catch (e) {
    console.log('找不到 screenShot 文件', componentDir);
    // console.log(e);
  }
  return screenShot;
}

function getDrawings(componentDir, component, libInfo, sourceDir, publicPath) {
  let drawings = [];
  try {
    const drawingsPath = `${componentDir}/drawings`;
    if (hasSvg(drawingsPath)) {
      drawings = fs
        .readdirSync(drawingsPath)
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
        .filter((filename) => filename.indexOf('.DS_Store') === -1);
      drawings = drawings.map((drawing) => {
        const prefix = [publicPath, libInfo, sourceDir].join('/');
        return `${prefix}/${component.symbol}/drawings/${drawing}`;
      });
    }
  } catch (e) {
    console.log('找不到 drawings 文件', componentDir);
    console.log(e);
  }
  return drawings;
}

function getBlocks(dir, { screenShot, drawings }) {
  if (!fs.existsSync(dir)) {
    logger.warn('未找到 blocks: ', dir);
    return [];
  }

  const files = fs.readdirSync(dir).filter((p) => p.endsWith('.vue'));
  const blocks = [];
  files.forEach((file, index) => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const matches = content.match(/<!--.*?-->/);
    let title = '';
    if (matches.length > 0) {
      title = matches[0].replace(/<!--/, '').replace(/-->/, '').trim();
      content = content.replace(/<!--.*?-->/, '');
    }

    const code = content.split('\n').map((s) => s.trim()).filter((s) => !!s).join('\n');
    blocks.push({
      concept: 'ViewBlockWithImage',
      title,
      description: '',
      code,
      screenshot: screenShot[index] || '',
      drawing: drawings[index] || '',
    });
  });

  return blocks;
}

/**
 *
 * @param {LcapUIConfig} config
 */
function genUsageByTs(config) {
  const {
    rootPath,
    assetsPublicPath,
    destPath,
    componentsPath,
    components,
  } = config;
  const data = [];
  const packageInfo = fs.readJSONSync(path.join(rootPath, 'package.json'));
  const libInfo = [packageInfo.name, '@', packageInfo.version].join('');

  components.map((obj) => ({ ...obj })).forEach((component) => {
    const sourceDir = path.join(rootPath, componentsPath);
    let componentDir = path.join(sourceDir, `${component.name}`);
    component.symbol = component.name;

    if (!fs.existsSync(componentDir)) {
      const name = `${componentDir}.vue`;
      componentDir = name;
      component.symbol = `${component.name}.vue`;
    }

    // api.ts
    try {
      const tsPath = `${componentDir}/api.ts`;
      // component.tsPath = tsPath;
      const info = transform(fs.readFileSync(tsPath, 'utf8'));
      Object.assign(component, info[0]);
    } catch (e) {
      console.log('找不到 TS 文件或 TS 报错', componentDir);
    }

    const screenShot = getScreenShot(
      componentDir,
      component,
      libInfo,
      componentsPath,
      assetsPublicPath,
    );
    const drawings = getDrawings(
      componentDir,
      component,
      libInfo,
      componentsPath,
      assetsPublicPath,
    );

    // blocks
    try {
      const blocks = getBlocks(`${componentDir}/demos/blocks`, {
        screenShot,
        drawings,
      });
      Object.assign(component, { blocks });
    } catch (e) {
      logger.error('处理 block 异常');
      console.log(e);
      return;
    }

    delete component.symbol;
    data.push(component);
  });

  const destDir = path.join(rootPath, destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const destFile = `${destDir}/nasl.ui.json`;
  fs.writeJSONSync(destFile, data, { spaces: 2 });
}

export default genUsageByTs;
