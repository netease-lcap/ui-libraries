import type { Plugin } from 'vite';

export interface LcapViteConfigPluginOptions {
  framework?: string;
  destDir?: string;
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

      if (!config.build) {
        config.build = {};
      }

      if (!config.build.rollupOptions) {
        config.build.rollupOptions = {};
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
