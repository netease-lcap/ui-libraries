import path from 'path';
import fs from 'fs-extra';
import type { Alias, Plugin, UserConfig } from 'vite';
import { LCAP_UI_PACKAGE_NAME, LCAP_UI_PACKAGE_PATH, LCAP_UI_PATH } from '../overload/constants';

export interface LcapViteConfigPluginOptions {
  framework?: string;
  destDir?: string;
  rootPath: string;
}

function hasLcapUI(rootPath) {
  return fs.existsSync(path.resolve(rootPath, LCAP_UI_PATH));
}

function getLcapUIPkgName(rootPath) {
  const pkgPath = path.resolve(rootPath, LCAP_UI_PACKAGE_PATH, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = fs.readJSONSync(pkgPath);
    return pkg.name;
  }

  return '';
}

function addResolve(config: UserConfig, options: LcapViteConfigPluginOptions) {
  if (!config.resolve) {
    config.resolve = {
      alias: [] as Alias[],
    };
  } else if (!config.resolve.alias) {
    config.resolve.alias = [] as Alias[];
  }

  if (typeof config.resolve.alias === 'object' && !Array.isArray(config.resolve.alias)) {
    const alias: Alias[] = [];
    const aliasMap = config.resolve.alias as { [find: string]: string };
    Object.keys(aliasMap).forEach((k) => {
      alias.push({
        find: k,
        replacement: aliasMap[k],
      });
    });
    config.resolve.alias = alias;
  }

  const alias: Alias[] = config.resolve.alias as Alias[];
  if (hasLcapUI(options.rootPath)) {
    alias.push({
      find: 'virtual-lcap:lcap-ui',
      replacement: path.resolve(options.rootPath, './.lcap/lcap-ui/runtime/index.js'),
    });

    alias.push({
      find: 'virtual-lcap:lcap-ui.css',
      replacement: path.resolve(options.rootPath, './.lcap/lcap-ui/runtime/index.css'),
    });
  }
}

function getCommonjsOptionsInclude(config: UserConfig): Array<string | RegExp> {
  if (!config.build || !config.build.commonjsOptions || !config.build.commonjsOptions.include) {
    return [];
  }

  if (!Array.isArray(config.build.commonjsOptions.include)) {
    return [config.build.commonjsOptions.include] as any[];
  }

  return config.build.commonjsOptions.include;
}

export default (options: LcapViteConfigPluginOptions) => {
  return {
    name: 'vite-lcap:default-config',
    config(config, { command }) {
      if (!config.define) {
        config.define = {};
      }
      const isBuild = command === 'build';

      config.define['process.env'] = {
        NODE_ENV: isBuild ? 'production' : 'development',
        VUE_APP_DESIGNER: false,
        ...(config.define['process.env'] || {}),
      };

      addResolve(config, options);

      if (!config.build) {
        config.build = {};
      }

      if (!config.build.rollupOptions) {
        config.build.rollupOptions = {};
      }

      if (!config.optimizeDeps) {
        config.optimizeDeps = {
          include: [],
        };
      } else if (!config.optimizeDeps.include) {
        config.optimizeDeps.include = [];
      }

      config.build.commonjsOptions = {
        extensions: ['.js'],
        ...config.build.commonjsOptions,
      };

      let lcapUIPkgName = '';
      const hasLcapUIPkg = hasLcapUI(options.rootPath);
      if (hasLcapUIPkg) {
        config.optimizeDeps.include?.push('virtual-lcap:lcap-ui');
        if (config.build.commonjsOptions.requireReturnsDefault === undefined) {
          config.build.commonjsOptions.requireReturnsDefault = (id) => {
            return id.indexOf('vue/dist/vue.esm.js') !== -1;
          };
        } else if (typeof config.build.commonjsOptions.requireReturnsDefault === 'function') {
          const temp = config.build.commonjsOptions.requireReturnsDefault;
          config.build.commonjsOptions.requireReturnsDefault = (id) => {
            if (id.indexOf('vue/dist/vue.esm.js') !== -1) {
              return true;
            }
            return temp(id);
          };
        }
        config.build.commonjsOptions.include = getCommonjsOptionsInclude(config).concat([
          '.lcap/lcap-ui/**/*.js',
          /node_modules/,
        ]);
        lcapUIPkgName = getLcapUIPkgName(options.rootPath);
      }

      // 非库构建不处理默认参数；
      if (!config.build.lib && config.build.rollupOptions && config.build.rollupOptions.input) {
        return;
      }

      const external: string[] = [];
      let globals: any = {};

      switch (options.framework) {
        case 'react':
          external.push('react', 'react-dom');
          globals = {
            react: 'React',
            'react-dom': 'ReactDOM',
          };
          break;
        case 'vue2':
          external.push('vue', 'vue-router', 'vue-i18n');
          globals = {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            'vue-i18n': 'VueI18n',
          };
          break;
        default:
          break;
      }

      if (lcapUIPkgName) {
        external.push(lcapUIPkgName);
        globals[lcapUIPkgName] = 'LcapUI';
        const alias = (config.resolve && config.resolve.alias ? config.resolve.alias : []) as Alias[];
        const alia = alias.find((it) => it.find === LCAP_UI_PACKAGE_NAME);
        if (alia && isBuild) {
          alia.replacement = lcapUIPkgName;
        }
      }

      config.build = {
        target: ['es2020', 'edge88', 'firefox78', 'chrome56', 'safari14'],
        outDir: options.destDir,
        sourcemap: true,
        ...config.build,
        lib: {
          entry: 'src/index.ts',
          formats: ['es', 'cjs', 'umd'],
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
          ...(config.build.lib || {}),
        },
        rollupOptions: {
          external,
          ...(config.build.rollupOptions),
          output: {
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === 'style.css') {
                return 'index.css';
              }

              return '[name][extname]';
            },
            interop: 'compat',
            ...config.build.rollupOptions.output,
            globals: {
              ...globals,
              ...(config.build.rollupOptions.output ? (config.build.rollupOptions.output as any).globals : {}),
            },
          },
        },
      };
    },
  } as Plugin;
};
