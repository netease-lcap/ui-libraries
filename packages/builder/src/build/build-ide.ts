import fs from 'fs-extra';
import path from 'path';
import { camelCase, upperFirst } from 'lodash';
import {
  UserConfig,
  build,
  loadConfigFromFile,
  mergeConfig,
} from 'vite';
import type { BuildIdeOptions, LcapBuildOptions } from './types';

export async function viteBuildIde(options: BuildIdeOptions, rootPath: string) {
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

  await build({
    configFile: false,
    envFile: false,
    ...buildConfig,
  });
}

export async function buildIDE(options: LcapBuildOptions) {
  if (!options.ide) {
    return;
  }

  // eslint-disable-next-line prefer-object-spread
  const ideOptions: BuildIdeOptions = Object.assign(
    {
      entry: 'ide/index',
      outDir: 'dist-theme/ide',
    },
    options.ide,
  );

  await viteBuildIde(ideOptions, options.rootPath);
}
