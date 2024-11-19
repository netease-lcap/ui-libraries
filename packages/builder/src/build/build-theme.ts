import { loadConfigFromFile, build } from 'vite';
import path from 'path';
import fs from 'fs-extra';
import genThemeConfig, { ThemeConfig } from './gens/gen-theme-config';
import { themePath } from '../constants/input-paths';
import logger from '../utils/logger';
import type { LcapBuildOptions } from './types';

const LIVE_RELOAD = {
  html: `<script type="text/javascript">
    if ('WebSocket' in window) {
      (function() {
        var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
        var address = protocol + window.location.host + window.location.pathname + '/ws';
        var socket = new WebSocket(address);
        socket.onmessage = function(msg) {
          if (msg.data === 'nasl.theme') window.location.reload();
        };
        console.log('Live reload enabled.');
      })();
    }
  </script>`,
  tag: '<!-- Code injected by live-server -->',
};

export async function viteBuildTheme(themeConfig: ThemeConfig, watch?: boolean) {
  const loadResult = await loadConfigFromFile({ command: 'build', mode: 'production' });
  if (!loadResult || !loadResult.config) {
    logger.error('未找到 vite 配置文件');
    return;
  }

  const { config } = loadResult;

  let entry;
  if (config.build && config.build.lib) {
    entry = config.build.lib.entry;
    delete config.build.lib;
  }

  config.plugins = config.plugins?.flat();
  const index = config.plugins?.findIndex((p: any) => p && p.name === 'vite:lcap-build');

  if (index && index !== -1) {
    config.plugins?.splice(index, 1);
  }
  config.plugins?.push({
    name: 'vite:lcap-theme-html',
    async transformIndexHtml(html, ctx) {
      html = html.replace('\'[THEME INFO HERE]\'', JSON.stringify({
        previewPages: themeConfig.previewPages,
        components: themeConfig.components.filter((c) => !c.hidden).map((c) => ({ name: c.name, title: c.title, group: c.group })),
      })).replace(LIVE_RELOAD.tag, watch ? LIVE_RELOAD.html : '');

      return html;
    },
  });

  if (!config.build) {
    config.build = {};
  }

  if (!config.build.outDir) {
    config.build.outDir = 'dist-theme';
  }

  config.build.outDir = `${config.build.outDir}/theme`;
  config.build.rollupOptions = {
    ...(config.build.rollupOptions || {}),
    input: themePath,
    external: [],
  };

  if (!config.resolve) {
    config.resolve = {};
  }

  if (!Array.isArray(config.resolve.alias)) {
    config.resolve.alias = {
      ...config.resolve.alias,
      vue: 'vue/dist/vue.esm.js',
    };
  } else {
    config.resolve.alias.push({
      find: 'vue',
      replacement: 'vue/dist/vue.esm.js',
    });
  }

  config.build.sourcemap = false;
  config.build.minify = 'esbuild';
  config.build.emptyOutDir = false;
  config.publicDir = '';
  config.build.assetsDir = '';
  config.base = './';

  await build({
    configFile: false,
    envFile: false,
    ...config,
  });
}

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

async function getComponentList(options: LcapBuildOptions) {
  if (options.type === 'extension') {
    const config = fs.readJSONSync(path.resolve(options.rootPath, 'nasl.extension.json'));
    const list: any[] = [];

    if (config && Array.isArray(config.frontends) && config.frontends.length > 0) {
      config.frontends.forEach((fe) => {
        (fe.viewComponents || []).forEach((comp) => {
          const index = list.findIndex((it) => it.name === comp.name);
          if (index === -1) {
            list.push(comp);
          }
        });
      });
    }
    return list.map(({
      name, kebabName,
      group, title, children,
      show,
    }) => {
      return {
        name: options.framework.startsWith('vue') ? kebabName : name,
        group,
        title,
        show,
        children: children.map((child) => (options.framework.startsWith('vue') ? child.kebabName : child.name)),
      };
    });
  }

  const components = fs.readJSONSync(path.resolve(options.rootPath, options.destDir, 'nasl.ui.json')) || [];

  return components.map(({
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
}

export async function buildTheme(options: LcapBuildOptions, watch?: boolean) {
  const components = await getComponentList(options);

  const themeConfig = genThemeConfig({
    components: components || [],
    themeVarCssPath: options.theme.themeVarCssPath || '',
    themeComponentFolder: options.theme.themeComponentFolder || '',
    previewPages: options.theme.previewPages || [],
    oldCssVarPath: options.theme.oldCssVarPath,
    findThemeType: options.theme.findThemeType,
    type: options.type,
    dependencies: options.dependencies,
  }, options.framework);

  if (!themeConfig || !themeConfig.components || themeConfig.components.length === 0) {
    return;
  }

  logger.start('开始构建 theme');
  await fs.writeJSON(path.join(options.destDir, 'theme.config.json'), themeConfig, { spaces: 2 });
  logger.success('生成 theme.config.json 成功！');

  await viteBuildTheme(themeConfig, watch);
  logger.success('构建theme 成功');
}
