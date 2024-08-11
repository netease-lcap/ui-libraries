import path from 'path';
import fs from 'fs-extra';
import logger from '../../utils/logger';
import parseComponentAPI from '../../nasl/parse-component-api';
import transformStory2Blocks from '../../nasl/story-nasl-block';

function hasImg(dir) {
  return fs.existsSync(path.join(dir, '0.png'));
}
function hasSvg(dir) {
  return fs.existsSync(path.join(dir, '0.svg'));
}

function getScreenShot(componentDir, assetsPublicPath) {
  let screenShot: string[] = [];
  try {
    const screenShotPath = `${componentDir}/screenshots`;
    if (hasImg(screenShotPath)) {
      screenShot = fs
        .readdirSync(screenShotPath)
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
        .filter((filename) => filename.indexOf('.DS_Store') === -1);
      screenShot = screenShot.map((screen) => {
        return `${assetsPublicPath}/screenshots/${screen}`;
      });
    }
  } catch (e) {
    logger.warn(`找不到 screenShot 文件 ${componentDir}/screenshots`);
    // console.log(e);
  }
  return screenShot;
}

function getDrawings(componentDir, assetsPublicPath) {
  let drawings: string[] = [];
  try {
    const drawingsPath = `${componentDir}/drawings`;
    if (hasSvg(drawingsPath)) {
      drawings = fs.readdirSync(drawingsPath)
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
        .filter((filename) => filename.indexOf('.DS_Store') === -1);
      drawings = drawings.map((drawing) => {
        return `${assetsPublicPath}/drawings/${drawing}`;
      });
    }
  } catch (e) {
    logger.warn(`找不到 drawings 文件 ${componentDir}/drawings`);
  }
  return drawings;
}

function getBlocksByDemo(componentDir, { screenshots, drawings }) {
  const dir = path.join(componentDir, 'demos/blocks');
  if (!fs.existsSync(dir)) {
    logger.warn('未找到 blocks: ', dir);
    return [];
  }

  const files = fs.readdirSync(dir).filter((p) => p.endsWith('.vue'));
  const blocks: any[] = [];
  files.sort((a, b) => {
    const n1 = Number(a.substring('BlocksDemo'.length, a.lastIndexOf('.')));
    const n2 = Number(b.substring('BlocksDemo'.length, b.lastIndexOf('.')));
    return n1 - n2;
  }).forEach((file, index) => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const matches = content.match(/<!--.*?-->/);
    let title = '';
    if (matches && matches.length > 0) {
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

function genBlockConfig(componentDir, { screenshots, drawings }, framework) {
  let storyFilePath = `${componentDir}/stories/block.stories`;
  if (fs.existsSync(`${storyFilePath}.jsx`)) {
    storyFilePath = `${storyFilePath}.jsx`;
  } else if (fs.existsSync(`${storyFilePath}.tsx`)) {
    storyFilePath = `${storyFilePath}.tsx`;
  } else if (fs.existsSync(`${storyFilePath}.js`)) {
    storyFilePath = `${storyFilePath}.js`;
  } else {
    return getBlocksByDemo(componentDir, { screenshots, drawings });
  }

  const code = fs.readFileSync(storyFilePath);
  const blocks = transformStory2Blocks(code.toString(), framework);
  return blocks.map(({ name, template }, index) => ({
    concept: 'ViewBlockWithImage',
    title: name,
    description: '',
    code: template,
    screenshot: screenshots[index] || '',
    drawing: drawings[index] || '',
  }));
}

export default function genNaslComponentConfig({
  apiPath,
  rootPath,
  assetsPublicPath,
  libInfo,
  extraConfig = {},
  components = [],
  framework = 'react',
}: any) {
  const component: any = {
    ...extraConfig,
  };

  try {
    const nasl = parseComponentAPI(fs.readFileSync(apiPath, 'utf8'), framework);
    Object.assign(component, nasl[0]);
  } catch (e: any) {
    logger.error(`解析 ${apiPath} 失败，${e.message}`);
    process.exit(1);
  }

  const extendsOptions = component?.extends?.map?.((item) => {
    const targetComponents: any = components.find((el: any) => item === el.name);
    if (!targetComponents) return {};
    return {
      props: targetComponents?.props ?? [],
      events: targetComponents?.events ?? [],
      methods: targetComponents?.methods ?? [],
      slots: targetComponents?.slots ?? [],
      blocks: targetComponents?.blocks ?? [],
    };
  });
  extendsOptions?.forEach((options) => Object.entries(options).forEach(([key, value]: any[]) => component[key]?.push(...value)));
  if (component.apiPath && !component.show) {
    delete component.symbol;
    delete component.apiPath;
    return {
      ...component,
      blocks: [],
    };
  }

  const componentDir = path.resolve(apiPath, '../');
  const assetsPath = [assetsPublicPath, libInfo, componentDir.substring(rootPath.length + 1)].join('/');

  const screenshots = getScreenShot(componentDir, assetsPath);
  const drawings = getDrawings(componentDir, assetsPath);

  try {
    const blocks = genBlockConfig(componentDir, { screenshots, drawings }, framework);
    Object.assign(component, { blocks });
  } catch (e: any) {
    logger.error(`${component.name} 处理 block 异常 ${e.message}`);
    process.exit(1);
  }

  return component;
}
