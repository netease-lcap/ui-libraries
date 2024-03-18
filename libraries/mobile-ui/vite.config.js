/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';
import vue2 from '@vitejs/plugin-vue2';
import vue2jsx from '@vitejs/plugin-vue2-jsx';
import autoprefixer from 'autoprefixer';
import { getHashDigest } from 'loader-utils';
import px2vw from './postcss-plugins/px2vw';

// 设置测试运行的时区
process.env.TZ = 'Asia/Shanghai';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const VueTplCompiler = require('./vue-template-compiler');

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue2({
        template: {
          compiler: VueTplCompiler,
        },
      }),
      vue2jsx({
        include: /.(js|ts|jsx|tsx)$/,
        babelPlugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'],
        vModel: true,
        functional: false,
        injectH: true,
        vOn: true,
        compositionAPI: false,
      }),
    ],
    define: {
      'process.env': {
        NODE_ENV: command === 'build' ? 'production' : 'development',
        VUE_APP_DESIGNER: false,
      },
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx', '.vue', '.mjs', '.cjs', '.json'],
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, './src-vusion/'),
        },
        {
          find: '__demo-entry__',
          replacement: path.resolve(__dirname, './demo-entry/index.js'),
        },
        {
          find: 'cloud-ui.vusion/src',
          replacement: path.resolve(__dirname, './cloudui'),
        },
        {
          find: /^~/,
          replacement: '',
        },
      ],
    },
    optimizeDeps: {
      include: ['online-svg-icon-vue2'],
    },
    esbuild: false,
    css: {
      modules: {
        generateScopedName: (name, filename) => {
          const rootPath = path.resolve(__dirname, './');
          const request = path.relative(rootPath, filename.replace(/\.vue[\\/].*$/, ''));
          const tmpPath = filename
            .substring(0, filename.indexOf('?'))
            .replace(/\.vue[\\/]/g, '_')
            .replace(/\.(vue|css)$/g, '')
            .replace(/_(module|index)$/, '');
          const vueName = path.basename(tmpPath);
          const content = ['vant', request].join('+');
          const hash = getHashDigest(content, 'md5', 'base64', 8);
          let scopedName = vueName;

          if (name !== 'root') {
            scopedName = `${scopedName}_${name}`;
          }

          scopedName = `${scopedName}__${hash}`.replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-').replace(/^((-?[0-9])|--)/, '_$1');

          return scopedName;
        },
      },
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: [
              '> 1%',
              'last 2 versions',
              'ie >= 9',
            ],
            grid: true,
          }),
          px2vw({
            unitToConvert: 'px',
            viewportWidth: 375,
            propList: ['*'],
            selectorBlackList: ['nov', /^m401$/, /^m404$/],

            landscape: true,
            landscapeUnit: 'vw',
            landscapeWidth: 812,
          }),
        ],
      },
    },
    build: {
      cssCodeSplit: false,
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      lib: {
        entry: 'src-vusion/index',
        name: 'vant',
        formats: ['umd'],
        fileName: () => 'index.js',
      },
      outDir: 'dist-theme',
      modulePreload: false,
      sourcemap: true,
      minify: true,
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        treeshake: false,
        external: ['vue', 'vue-router', 'vue-i18n'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            'vue-i18n': 'VueI18n',
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') {
              return 'index.css';
            }

            return '[name][extname]';
          },
        },
      },
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    test: {
      environment: 'jsdom',
      css: {
        modules: {
          classNameStrategy: 'non-scoped',
        },
      },
      coverage: {
        provider: 'v8',
        deps: {
          inline: ['vitest-canvas-mock'],
        },
        reporter: ['text', 'json', 'html'],
        reportsDirectory: './test/coverage',
        include: [
          'src/**/*.?(c|m)[jt]s?(x)',
          'src/**/*.vue',
          'src-vusion/**/*.?(c|m)[jt]s?(x)',
          'src-vusion/**/*.vue',
        ],
        exclude: [
          '**/stories/**',
          '**/tests/*',
          '**/demos/*',
          '**/api.ts',
          'cloudui/**/*',
          'src-vusion/components/*/index.js',
          'src-vusion/index.js',
        ],
      },
      setupFiles: ['./test/setup.js'],
      environmentOptions: {
        jsdom: {
          // i-ico.vue/icon.js 要求文档必须有一个 script 标签
          html: '<!DOCTYPE html><html><head><meta charset="UTF-8" /><script></script></head><body></body></html>',
        },
      },
    },
  };
});
