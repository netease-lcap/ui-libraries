import {
  type LibraryOptions,
  type Plugin,
  type UserConfig,
  createLogger,
} from 'vite';
import { getBuildOutputConifg } from '../utils/build-utils';

export interface LcapViteConfigPluginOptions {
  framework: string;
  destDir?: string;
  type: 'nasl.ui' | 'extension';
  rootPath: string;
}

function resetLogger(config: UserConfig) {
  const viteLogger = createLogger();
  const loggerWarn = viteLogger.warn;

  viteLogger.warn = (msg, options) => {
    // 忽略空 CSS 文件的警告
    if (msg.includes('vite:css')) {
      return;
    }

    loggerWarn(msg, options);
  };

  if (!config.customLogger) {
    config.customLogger = viteLogger;
  }

  return config;
}

function addDefine(config: UserConfig, isBuild: boolean) {
  if (!config.define) {
    config.define = {};
  }

  config.define['process.env'] = {
    NODE_ENV: isBuild ? 'production' : 'development',
    VUE_APP_DESIGNER: false,
    ...(config.define['process.env'] || {}),
  };
}

function setLibBuildConfig(options: LcapViteConfigPluginOptions, config: UserConfig) {
  const { external, globals } = getBuildOutputConifg({
    rootPath: options.rootPath,
    type: options.type,
    framework: options.framework,
    addDepExternal: false,
  });

  if (!config.build) {
    config.build = {};
  }

  if (!config.build.rollupOptions) {
    config.build.rollupOptions = {};
  }

  config.build.commonjsOptions = {
    extensions: ['.js'],
    ...config.build.commonjsOptions,
  };

  // 非库构建不处理默认参数；
  if (config.build && !config.build.lib && config.build.rollupOptions && config.build.rollupOptions.input) {
    return;
  }

  if (options.framework === 'vue2' && options.type === 'nasl.ui') {
    delete globals['@vue/composition-api'];
    const i = external.indexOf('@vue/composition-api');
    if (i !== -1) {
      external.splice(i, 1);
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
      // 兼容 vite6
      cssFileName: 'index.css',
      ...(config.build.lib || {}),
    } as LibraryOptions,
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
}

export default function lcapViteConfigPlugin(options: LcapViteConfigPluginOptions) {
  return {
    name: 'vite:lcap-default-config',
    enforce: 'post',
    config(config: UserConfig, { command }) {
      const isBuild = command === 'build';
      resetLogger(config);
      addDefine(config, isBuild);
      setLibBuildConfig(options, config);
    },
  } as Plugin;
}
