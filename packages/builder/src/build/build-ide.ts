import fs from 'fs-extra';
import path from 'path';
import { camelCase, isFunction, upperFirst } from 'lodash';
import {
  UserConfig,
  build,
  loadConfigFromFile,
  mergeConfig,
} from 'vite';
import { execSync } from 'child_process';
import type { BuildIdeOptions, LcapBuildOptions } from './types';
import logger from '../utils/logger';

export async function viteBuildIde(options: BuildIdeOptions, rootPath: string, watch?: boolean, send?: (msg: string) => void) {
  const pkg = await fs.readJSON(path.join(rootPath, 'package.json'));
  let buildConfig: UserConfig = {
    define: {
      'process.env': {
        NODE_ENV: 'production',
      },
    },
    build: {
      target: ['es2020', 'edge88', 'firefox78', 'chrome56', 'safari14'],
      lib: {
        entry: options.entry || '',
        formats: ['umd'],
        name: `$ideMaterial${upperFirst(camelCase(pkg.name))}`,
        fileName: (format, entryName) => {
          switch (format) {
            case 'es':
              return `${entryName}.mjs`;
            case 'cjs':
              return `${entryName}.cjs`;
            default:
              return `${entryName}.js`;
          }
        },
      },
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') {
              return 'index.css';
            }

            return '[name][extname]';
          },
          interop: 'compat',
        },
      },
      outDir: options.outDir,
    },
  };

  if (options.configFile && !options.configFile.startsWith('vite.config')) {
    const loadResult = await loadConfigFromFile({ command: 'build', mode: 'production' }, options.configFile, rootPath);

    if (loadResult && loadResult.config) {
      buildConfig = mergeConfig(loadResult.config, buildConfig);
    }
  }

  if (buildConfig.build?.rollupOptions?.external) {
    delete buildConfig.build.rollupOptions.external;
  }

  if (watch) {
    if (!buildConfig.build) {
      buildConfig.build = {};
    }
    buildConfig.build.watch = {};
  }

  if (watch && isFunction(send)) {
    if (!buildConfig.plugins) {
      buildConfig.plugins = [];
    }
    buildConfig.plugins.push({
      name: 'vite:lcap:socket',
      async closeBundle() {
        send('update.ide');
      },
    });
  }

  await build({
    configFile: false,
    envFile: false,
    ...buildConfig,
  });
}

const isExistEntry = (entry, rootPath) => {
  if (!entry) {
    return false;
  }

  if (entry.indexOf('.') !== -1) {
    return fs.existsSync(path.resolve(rootPath, entry));
  }

  return [
    '.js',
    '.jsx',
    '.tsx',
    '.ts',
  ].findIndex((ext) => {
    return fs.existsSync(path.resolve(rootPath, `${entry}${ext}`));
  }) !== -1;
};

const settersFolder = 'setters';
function buildSetters(options: LcapBuildOptions) {
  if (!options.ide?.setters) {
    return;
  }

  const { rootPath, entries } = options.ide.setters;

  if (!fs.existsSync(path.resolve(rootPath))) {
    logger.warn(`[builder] setters root path ${rootPath} not exists`);
    return;
  }

  const setters = {};

  Object.entries(entries).forEach(([key, entry]) => {
    if (fs.existsSync(path.resolve(rootPath, entry))) {
      setters[key] = entry;
    } else {
      logger.warn(`[builder] setters entry ${entry} not exists`);
    }
  });

  if (Object.keys(setters).length === 0) {
    logger.warn('[builder] setters entries is empty');
    return;
  }

  fs.writeFileSync(path.resolve(rootPath, 'setters.json'), JSON.stringify(setters, null, 2));

  execSync('npm run build', {
    cwd: rootPath,
  });

  // 拷贝 setters 到 dist 目录
  const targetPath = path.resolve(rootPath, 'dist');
  const destPath = path.resolve(options.rootPath, options.destDir, settersFolder);

  fs.copySync(targetPath, destPath);

  interface Setter {
    name: string;
    js: string;
    css?: string;
  }

  const setterList: Setter[] = Object.keys(setters).map((key) => {
    const setter: Setter = {
      name: key,
      js: `${options.destDir}/${settersFolder}/${key}.js`,
    };

    const cssPath = `${options.destDir}/${settersFolder}/${key}.css`;

    if (fs.existsSync(path.resolve(options.rootPath, cssPath))) {
      setter.css = cssPath;
    }

    return setter;
  });

  fs.writeFileSync(path.resolve(options.rootPath, options.destDir, 'setters.json'), JSON.stringify(setterList, null, 2));
}

export async function buildIDE(options: LcapBuildOptions, watch: boolean = false, send?: (msg: string) => void) {
  if (options.ide?.setters) {
    await buildSetters(options);
  }

  const DEFUALT_IDE_OPTIONS = {
    entry: 'ide/index',
    outDir: `${options.destDir}/ide`,
  };

  // eslint-disable-next-line prefer-object-spread
  const ideOptions: BuildIdeOptions = Object.assign(
    DEFUALT_IDE_OPTIONS,
    options.ide,
  );

  if (!isExistEntry(ideOptions.entry, options.rootPath)) {
    return;
  }

  await viteBuildIde(ideOptions, options.rootPath, watch, send);
}
