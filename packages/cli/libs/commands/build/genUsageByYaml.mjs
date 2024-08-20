import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs-extra';
import * as logger from '../../utils/logger.mjs';

const removeDeprecated = (component) => {
  if (component.events) {
    component.events = component.events
      .map((item) => {
        if (item.description === '@deprecated') {
          return null;
        }
        if (item.deprecated === true) {
          return null;
        }
        return item;
      })
      .filter((i) => i);
  }
  if (component.attrs) {
    component.attrs = component.attrs
      .map((item) => {
        if (item.description === '@deprecated') {
          return null;
        }
        if (item.deprecated === true) {
          return null;
        }
        return item;
      })
      .filter((i) => i);
  }
};
const hasImg = (dir) => {
  return fs.existsSync(path.join(dir, '0.png'));
};

const hasSvg = (dir) => {
  return fs.existsSync(path.join(dir, '0.svg'));
};

function getBlocks(dir) {
  if (!fs.existsSync(dir)) {
    logger.warn('未找到 blocks: ', dir);
    return [];
  }

  const files = fs.readdirSync(dir).filter((p) => p.endsWith('.vue'));
  const blocks = [];
  files.forEach((file) => {
    let content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const matches = content.match(/<!--.*?-->/);
    let title = '';
    if (matches.length > 0) {
      title = matches[0].replace(/<!--/, '').replace(/-->/, '').trim();
      content = content.replace(/<!--.*?-->/, '');
    }

    const code = content.split('\n').map((s) => s.trim()).filter((s) => !!s).join('\n');
    blocks.push({
      title,
      description: '',
      code,
    });
  });

  return blocks;
}

const genUsage = (dir) => {
  let desc = null;
  if (fs.existsSync(dir)) {
    desc = yaml.load(fs.readFileSync(path.join(dir, 'api.yaml')).toString());
  } else {
    throw new Error(`${dir} api.yaml not exist`);
  }
  if (Array.isArray(desc)) {
    desc.forEach((item) => {
      removeDeprecated(item);
    });
    if (desc.length > 1) {
      const tmp = desc;
      desc = tmp.shift();
      desc.children = tmp;
    } else {
      // eslint-disable-next-line prefer-destructuring
      desc = desc[0];
    }
  }
  let pkg = {};
  if (fs.existsSync(path.join(dir, 'package.json'))) {
    pkg = fs.readJSONSync(path.join(dir, 'package.json'));
  }
  const { labels } = desc;
  if (!labels) {
    throw new Error(`${desc.name} labels not exist`);
  }

  const blocks = getBlocks(path.join(dir, 'demos/blocks'));

  let screenShot = [];
  const screenShotPath = path.join(dir, 'screenshots');
  if (hasImg(screenShotPath)) {
    screenShot = fs
      .readdirSync(screenShotPath)
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
      .filter((filename) => filename.indexOf('.DS_Store') === -1);
  }

  let drawings = [];
  const drawingsPath = path.join(dir, 'drawings');
  if (hasSvg(drawingsPath)) {
    drawings = fs
      .readdirSync(drawingsPath)
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
      .filter((filename) => filename.indexOf('.DS_Store') === -1);
  }

  return {
    symbol: desc.name,
    name: desc.title,
    version: pkg.version,
    icon: desc.icon,
    scope: desc.scope,
    scenes: desc.scenes,
    industry: desc.industry,
    repoAddr:
      desc.repoAddr
      || (typeof pkg.repository === 'string'
        ? pkg.repository
        : JSON.stringify(pkg.repository)),
    document: desc.document || pkg.document,
    depDescription: {
      ...desc.depDescription,
      ...pkg.vusionDependencies,
    },
    description: desc.description || pkg.description,
    labels,
    screenShot: JSON.stringify(screenShot),
    blocks: JSON.stringify(blocks),
    jsonSchema: {
      name: desc.name,
      title: desc.title,
      description: desc.description || pkg.description,
      category: desc.labels[0],
      control: desc.control,
      screenShot: JSON.stringify(screenShot),
      drawings: JSON.stringify(drawings),
      blocks,
      attrs: desc.attrs,
      slots: desc.slots,
      methods: desc.methods,
      events: desc.events,
      'is-sub': desc['is-sub'],
      i18n: desc.i18n,
      children: (desc.children || []).map((child) => ({
        name: child.name,
        title: child.title,
        description: child.description,
        control: child.control,
        attrs: child.attrs,
        slots: child.slots,
        'is-sub': child['is-sub'],
        events: child.events,
        i18n: child.i18n,
      })),
    },
  };
};

export default (config) => {
  const {
    rootPath,
    assetsPublicPath,
    destPath,
    componentsPath,
    components,
  } = config;
  const packageInfo = fs.readJSONSync(path.join(rootPath, 'package.json'));
  const libInfo = [packageInfo.name, '@', packageInfo.version].join('');

  const data = [];
  components.forEach((component) => {
    const sourceDir = path.join(rootPath, componentsPath);
    let componentDir = path.join(sourceDir, `${component.name}`);
    component.symbol = component.name;

    if (!fs.existsSync(componentDir)) {
      const name = `${componentDir}.vue`;
      componentDir = name;
      component.symbol = `${component.name}.vue`;
    }

    const result = genUsage(componentDir);

    if (result) {
      data.push(result);
    }
  });

  Object.values(data).forEach((item) => {
    let screenShot = JSON.parse(item.screenShot);
    screenShot = screenShot
      .filter((screen) => !screen.includes('.DS_Store'))
      .map((screen) => `${assetsPublicPath}/${libInfo}/${componentsPath}/${item.symbol}/screenshots/${screen}`);
    // eslint-disable-next-line no-multi-assign
    item.jsonSchema.screenShot = item.screenShot = screenShot.join(',');

    let drawings = JSON.parse(item.jsonSchema.drawings);
    drawings = drawings
      .filter((screen) => !screen.includes('.DS_Store'))
      .map((screen) => `${assetsPublicPath}/${libInfo}/${componentsPath}/${item.symbol}.vue/drawings/${screen}`);
    item.jsonSchema.drawings = drawings.join(',');
    delete item.symbol;
  });

  const destDir = path.join(rootPath, destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const destFile = `${destDir}/usage.json`;
  fs.writeJSONSync(destFile, data, { spaces: 2 });
};
