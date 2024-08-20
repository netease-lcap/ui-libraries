/* eslint-disable no-param-reassign */
import fs from 'fs-extra';
import path from 'path';
import { parseComponentAPI as transform } from '@lcap/builder';
import * as logger from '../../utils/logger.mjs';
import transformStory2Blocks from '../../transforms/story2block.mjs';
import { getComponentPathInfo } from '../../utils/index.mjs';
import snippetCode2NASL from '../../transforms/snippetCode2NASL.mjs';

function hasImg(dir) {
  return fs.existsSync(path.join(dir, '0.png'));
}
function hasSvg(dir) {
  return fs.existsSync(path.join(dir, '0.svg'));
}

function getScreenShot(componentDir, component, libInfo, sourceDir, publicPath) {
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
    logger.warn(`找不到 screenShot 文件 ${componentDir}/screenshots`);
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
    logger.warn(`找不到 drawings 文件 ${componentDir}/drawings`);
  }
  return drawings;
}

function getBlocksByDemo(componentDir, { screenshots, drawings }) {
  const dir = `${componentDir}/demos/blocks`;
  if (!fs.existsSync(dir)) {
    logger.warn('未找到 blocks: ', dir);
    return [];
  }

  const files = fs.readdirSync(dir).filter((p) => p.endsWith('.vue'));
  const blocks = [];
  files.sort((a, b) => {
    const n1 = Number(a.substring('BlocksDemo'.length, a.lastIndexOf('.')));
    const n2 = Number(b.substring('BlocksDemo'.length, b.lastIndexOf('.')));
    return n1 - n2;
  }).forEach((file, index) => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const matches = content.match(/<!--.*?-->/);
    let title = '';
    if (matches.length > 0) {
      title = matches[0]
        .replace(/<!--/, '')
        .replace(/-->/, '')
        .trim();
      content = content.replace(/<!--.*?-->/, '');
    }

    const code = content
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => !!s)
      .join('\n');
    blocks.push({
      concept: 'ViewBlockWithImage',
      title,
      description: '',
      code,
      screenshot: screenshots[index] || '',
      drawing: drawings[index] || '',
    });
  });

  return blocks;
}

function getBlocksByStory(componentDir, { screenshots, drawings }) {
  const storyFilePath = `${componentDir}/stories/block.stories.jsx`;
  if (!fs.existsSync(storyFilePath)) {
    logger.warn(`未找到blocks 文件, ${storyFilePath}`);
    return [];
  }

  const code = fs.readFileSync(storyFilePath);
  const blocks = transformStory2Blocks(code.toString());

  return blocks.map(({ name, template }, index) => ({
    concept: 'ViewBlockWithImage',
    title: name,
    description: '',
    code: template,
    screenshot: screenshots[index] || '',
    drawing: drawings[index] || '',
  }));
}

/**
 *
 * @param {LcapUIConfig} config
 */
function genUsageByTs(config) {
  const {
    rootPath, assetsPublicPath, destPath, componentsPath, components, blockGenerateType,
  } = config;
  const data = [];
  const packageInfo = fs.readJSONSync(path.join(rootPath, 'package.json'));
  const libInfo = [packageInfo.name, '@', packageInfo.version].join('');
  components
    .map((obj) => ({ ...obj }))
    .forEach((component) => {
      const { componentDir, symbol, sourceDir } = getComponentPathInfo(component.name, rootPath, componentsPath);
      component.symbol = symbol;
      const tsPath = component.apiPath ? path.resolve(rootPath, componentsPath, component.apiPath) : `${componentDir}/api.ts`;
      if (!fs.existsSync(tsPath)) {
        logger.error(`未找到组件 ${component.name} 的描述文件（api.ts）, ${tsPath}`);
        process.exit(1);
      }

      // api.ts
      try {
        // component.tsPath = tsPath;
        const info = transform(fs.readFileSync(tsPath, 'utf8'));
        Object.assign(component, info[0]);
        if (packageInfo.name === '@lcap/pc-react-ui' && component.slots && component.slots.length > 0) {
          component.slots.forEach((slotConfig) => {
            if (!slotConfig.snippets || slotConfig.snippets.length === 0) {
              return;
            }

            slotConfig.snippets = slotConfig.snippets.map((snippetConfig) => ({
              ...snippetConfig,
              code: snippetCode2NASL(snippetConfig.code),
            }));
          });
        }
      } catch (e) {
        logger.error(`解析 ${tsPath} 失败，${e.message}`);
        process.exit(1);
      }

      const extendsOptions = component?.extends?.map?.((item) => {
        const targetComponents = data.find((el) => item === el.name);
        if (!targetComponents) return {};
        return {
          props: targetComponents?.props ?? [],
          events: targetComponents?.events ?? [],
          methods: targetComponents?.methods ?? [],
          slots: targetComponents?.slots ?? [],
          blocks: targetComponents?.blocks ?? [],
        };
      });
      extendsOptions?.forEach((options) => Object.entries(options).forEach(([key, value]) => component[key]?.push(...value)));
      if (component.apiPath && !component.show) {
        delete component.symbol;
        delete component.apiPath;
        data.push({
          ...component,
          blocks: [],
        });
        return;
      }

      const screenshots = getScreenShot(componentDir, component, libInfo, sourceDir, assetsPublicPath);

      const drawings = getDrawings(componentDir, component, libInfo, sourceDir, assetsPublicPath);

      // blocks
      try {
        const blocks = blockGenerateType === 'story' ? getBlocksByStory(componentDir, { screenshots, drawings }) : getBlocksByDemo(componentDir, { screenshots, drawings });
        Object.assign(component, { blocks });
      } catch (e) {
        logger.error(`处理 block 异常 ${e.message}`);
      }
      // console.log(component, 'component', component.extends);
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
