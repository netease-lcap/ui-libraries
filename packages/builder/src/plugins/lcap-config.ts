import path from 'path';
import type { Alias, Plugin, UserConfig } from 'vite';

export interface LcapViteConfigPluginOptions {
  framework?: string;
  destDir?: string;
  rootPath: string;
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
  alias.push({
    find: 'virtual-lcap:lcap-ui',
    replacement: path.resolve(options.rootPath, './.lcap/lcap-ui/runtime/index.js'),
  });

  alias.push({
    find: 'virtual-lcap:lcap-ui.css',
    replacement: path.resolve(options.rootPath, './.lcap/lcap-ui/runtime/index.css'),
  });
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

      config.define['process.env'] = {
        NODE_ENV: command === 'build' ? 'production' : 'development',
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

      config.optimizeDeps.include?.push('virtual-lcap:lcap-ui');

      config.build.commonjsOptions = {
        requireReturnsDefault: true,
        ...config.build.commonjsOptions,
        include: getCommonjsOptionsInclude(config).concat([
          '.lcap/**/*.js',
        ]),
      };

      // 非库构建不处理默认参数；
      if (!config.build.lib && config.build.rollupOptions && config.build.rollupOptions.input) {
        return;
      }

      const external: string[] = [];
      let globals: any = {};

      switch (options.framework) {
        case 'react':
          external.push('react', 'react-dom', 'virtual-lcap:lcap-ui');
          globals = {
            react: 'React',
            'react-dom': 'ReactDOM',
            'virtual-lcap:lcap-ui': 'LcapUI',
          };
          break;
        case 'vue2':
          external.push('vue', 'vue-router', 'vue-i18n', 'virtual-lcap:lcap-ui');
          globals = {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            'vue-i18n': 'VueI18n',
            'virtual-lcap:lcap-ui': 'LcapUI',
          };
          break;
        default:
          break;
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
