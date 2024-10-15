/* eslint-disable no-param-reassign */
import fs from 'fs-extra';
import path from 'path';
import type { LcapBuildOptions } from './types';
import logger from '../utils/logger';
import { buildIDE } from './build-ide';
import { buildTheme } from './build-theme';
import buildCSSRules from './build-css-rules';
import { buildNaslExtension } from './build-extension';
import { execSync } from '../utils/exec';
import genNaslUIConfig from './gens/gen-nasl-ui';
import genThemeJsonOld from './gens/gen-theme-json-old';
import genManifestConfig from './gens/gen-manifest-config';
import buildDecalaration from './build-declaration';
import { getConfigComponents } from '../utils';

const Groups = [
  'Container',
  'Layout',
  'Navigation',
  'Display',
  'Table',
  'Form',
  'Selector',
  'chart',
  'Chart',
  'Basic',
  'Advanced',
  'Feedback',
  'Effects',
  'Process',
];

const getGroupIndex = (n) => {
  const i = Groups.indexOf(n);

  return i === -1 ? 20 : i;
};

export function buildThemeOld(rootPath, destDir) {
  const configPath = path.join(rootPath, './lcap-ui.config.js');
  const themeConfigPath = path.join(rootPath, './lcap-ui.theme.json');

  if (!fs.existsSync(configPath) || !fs.existsSync(themeConfigPath)) {
    return;
  }

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const confg = require(configPath);

  genThemeJsonOld({
    rootPath,
    destPath: destDir,
    themePath: confg.themePath,
    themeConfigPath: 'lcap-ui.theme.json',
  });
}

export function buildNaslUI(options: LcapBuildOptions) {
  if (options.type !== 'nasl.ui') {
    return;
  }

  logger.start('开始生成 nasl.ui.json...');
  let naslUIConfig = genNaslUIConfig({
    rootPath: options.rootPath,
    framework: options.framework,
    components: options.components,
    assetsPublicPath: options.assetsPublicPath,
  });

  if (options.dependencies && options.dependencies.length > 0) {
    options.dependencies.forEach(({ rootPath, config }) => {
      const configFn = typeof config === 'function' ? config : (c) => c;
      const list = genNaslUIConfig({
        rootPath,
        framework: options.framework,
        components: getConfigComponents(rootPath),
        assetsPublicPath: options.assetsPublicPath,
        dependency: true,
      });

      naslUIConfig.unshift(...list.map((it) => configFn(it)));
    });
  }

  naslUIConfig = naslUIConfig.sort((c1, c2) => {
    const order1 = c1.order || 20;
    const order2 = c2.order || 20;

    return order1 - order2;
  });

  options.components = naslUIConfig.map(({
    name,
    kebabName,
    group,
    title,
    children,
    show,
  }) => {
    return {
      name: options.framework.startsWith('vue') ? kebabName : name,
      group,
      title,
      children: children.map((child) => (options.framework.startsWith('vue') ? child.kebabName : child.name)),
      show,
    };
  }).sort((a, b) => (getGroupIndex(a.group) - getGroupIndex(b.group)));

  logger.success('生成 nasl.ui.json 成功！');
  fs.writeJSONSync(path.join(options.destDir, 'nasl.ui.json'), naslUIConfig, { spaces: 2 });
}

export function buildI18N(options: LcapBuildOptions) {
  const {
    rootPath,
    i18n,
  } = options;

  if (!i18n) {
    return;
  }

  const langs = Object.keys(i18n);
  if (!langs || langs.length === 0) {
    logger.warn('未找到i18n 配置文件');
    return;
  }

  const data = {};

  langs.forEach((key) => {
    data[key] = fs.readJSONSync(path.join(rootPath, i18n[key]));
  });

  const destDir = path.join(rootPath, options.destDir);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const destFile = `${destDir}/i18n.json`;
  fs.writeJSONSync(destFile, data, { spaces: 2 });
}

export function buildManifest(options: LcapBuildOptions) {
  const manifest = genManifestConfig(options);
  fs.writeJSONSync(`${options.destDir}/manifest.json`, manifest, { spaces: 2 });
  fs.writeJSONSync(`${options.rootPath}/manifest.json`, manifest, { spaces: 2 });
}

export async function buildNaslUILibrary(options: LcapBuildOptions) {
  buildNaslUI(options);
  buildCSSRules(options);
  await buildTheme(options);
  buildI18N(options);
  await buildDecalaration(options);
  await buildManifest(options);
  if (options.pnpm) {
    execSync('pnpm pack');
  } else {
    execSync('npm pack');
  }
}

export async function lcapBuild(options: LcapBuildOptions) {
  if (!options.destDir) {
    options.destDir = 'dist-theme';
  }

  await buildIDE(options);

  if (options.type === 'extension') {
    await buildNaslExtension(options);
    return;
  }

  await buildNaslUILibrary(options);
}
