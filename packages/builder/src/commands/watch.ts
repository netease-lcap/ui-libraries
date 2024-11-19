import { loadConfigFromFile, build } from 'vite';
import chokidar from 'chokidar';
import fs from 'fs-extra';
import path from 'path';
import logger from '../utils/logger';
import { buildIDE } from '../build/build-ide';
import {
  lcapBuild,
  buildI18N,
  buildManifest,
  buildNaslUI,
} from '../build';
import buildCSSInfo from '../build/build-css-info';
import { buildNaslExtensionConfig, buildNaslExtensionManifest } from '../build/build-extension';
import { buildTheme } from '../build/build-theme';
import buildDecalaration from '../build/build-declaration';
import { LcapBuildOptions } from '../build/types';
import { exec } from '../utils/exec';
import LiveServer from '../utils/server';

async function getBuildConfig() {
  const loadResult = await loadConfigFromFile({ command: 'build', mode: 'production' });
  if (!loadResult || !loadResult.config) {
    throw new Error('未找到 vite 配置文件');
  }

  const { config } = loadResult;

  if (config.plugins) {
    config.plugins = config.plugins.flat();
  } else {
    config.plugins = [];
  }

  const index = config.plugins?.findIndex((p: any) => p && p.name === 'vite:lcap-build') as any;

  let lcapBuildPlugin: any;
  if (index && index !== -1) {
    lcapBuildPlugin = config.plugins[index];
    config.plugins.splice(index, 1);
  }

  return {
    viteConfig: config,
    // eslint-disable-next-line no-underscore-dangle
    buildOptions: lcapBuildPlugin?._options,
  };
}

async function getWatcherTasks(options: LcapBuildOptions, pkgInfo: any) {
  const NaslUIWatcher = {
    name: 'nasl.ui',
    check(filePath: string) {
      return filePath.endsWith('api.ts');
    },
    build: async () => {
      await buildNaslUI(options);
      await buildDecalaration(options);
      await buildCSSInfo(options);
      await buildManifest(options);

      if (pkgInfo && pkgInfo.scripts && pkgInfo.scripts.lowcode) {
        await exec('npm run lowcode');
      }
    },
  };

  const ThemeWatcher = {
    name: 'nasl.theme',
    check(filePath: string) {
      return filePath.includes('src/') && filePath.includes('/theme/');
    },
    build: async () => {
      await buildTheme(options, true);
    },
  };

  const I18nWatcher = {
    name: 'nasl.ui.i18n',
    check(filePath: string) {
      const list = Object.keys(options.i18n || {}).map((k) => (options.i18n ? path.resolve(options.rootPath, options.i18n[k]) : ''));
      const relativePath = path.resolve(options.rootPath, filePath);
      return list.length > 0 && list.includes(relativePath);
    },
    build: async () => {
      await buildI18N(options);
    },
  };

  const NaslExtensionWatcher = {
    name: 'nasl.extension',
    check(filePath: string) {
      return filePath.includes('src/') && (filePath.endsWith('api.ts') || filePath.includes('src/logics'));
    },
    build: async () => {
      await buildNaslExtensionConfig(options);
      await buildDecalaration(options);
      await buildNaslExtensionManifest(options, true);
    },
  };

  if (options.type === 'extension') {
    return [
      NaslExtensionWatcher,
      ThemeWatcher,
    ];
  }

  return [
    NaslUIWatcher,
    ThemeWatcher,
    I18nWatcher,
  ];
}

async function startWatcher(options: LcapBuildOptions, pkgInfo: any, send: (msg: string) => void) {
  let enabledBuild = false;
  const watcher = chokidar.watch(['./src', './src-vusion', options.destDir], {
    ignoreInitial: true,
  });
  const watcherTasks = await getWatcherTasks(options, pkgInfo);

  const taskQueue: any[] = [];
  let executing = false;
  async function executeTask(tasks: any[]) {
    tasks.forEach((task) => {
      if (taskQueue.includes(task)) {
        return;
      }

      taskQueue.push(task);
    });

    if (executing) {
      return;
    }

    executing = true;
    while (taskQueue.length > 0) {
      const task = taskQueue.shift();
      try {
        logger.start(`start ${task.name} task build`);
        send('building');
        // eslint-disable-next-line no-await-in-loop
        await task.build();
        logger.success(`${task.name} task build successed!`);
        send(task.name);
      } catch (e) {
        logger.error(`${task.name} task build error!`);
        logger.error(e);
      }
    }

    executing = false;
  }

  const handleFileChange = async (filePath: string, action: 'add' | 'change' | 'unlink') => {
    if (!enabledBuild) {
      return;
    }

    const tasks = watcherTasks.filter((task) => task.check(filePath));
    if (tasks.length > 0) {
      console.clear();
      logger.info(`${action} file, filePath: ${filePath} `);
      executeTask(tasks);
    }
  };

  watcher.on('add', (filePath) => handleFileChange(filePath, 'add'))
    .on('change', (filePath) => handleFileChange(filePath, 'change'))
    .on('unlink', (filePath) => handleFileChange(filePath, 'unlink'));

  logger.info('start files watcher');

  return {
    start: () => {
      enabledBuild = true;
    },
    close: () => watcher.close(),
  };
}

function startServer({ port, https }) {
  return LiveServer.start({
    port,
    https,
    cors: true,
  });
}

export default async (rootPath: string, { port, https }: any) => {
  const { viteConfig, buildOptions } = await getBuildConfig();
  const pkgInfo = fs.readJSONSync(path.join(rootPath, 'package.json'));
  let onceBuilded = false;
  let server;
  // eslint-disable-next-line no-inner-declarations
  function send(msg) {
    if (!server) {
      return;
    }

    server.send(msg);
  }

  const watcher = await startWatcher(buildOptions, pkgInfo, send);

  if (fs.existsSync(buildOptions.destDir)) {
    await fs.remove(buildOptions.destDir);
  }
  // 构建 ide 和 运行时文件， watch;
  await Promise.all([
    buildIDE(buildOptions, true, send),
    build({
      configFile: false,
      envFile: false,
      ...viteConfig,
      plugins: [
        ...viteConfig.plugins as any[],
        {
          async closeBundle() {
            if (onceBuilded) {
              send('update.runtime');
              return;
            }

            onceBuilded = true;

            try {
              await lcapBuild(buildOptions, 'watch');
              if (pkgInfo && pkgInfo.scripts && pkgInfo.scripts.lowcode) {
                await exec('npm run lowcode');
              }
              logger.success('build successed! starting file watching...');
              watcher.start();

              server = await startServer({ port, https });
            } catch (e) {
              logger.error(e);
              process.exit(1);
            }
          },
        },
      ],
      build: {
        ...viteConfig.build,
        watch: {},
        emptyOutDir: false,
      },
    }),
  ]);
};
