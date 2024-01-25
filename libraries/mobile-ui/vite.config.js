/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';
import vue2 from '@vitejs/plugin-vue2';
import vue2jsx from '@vitejs/plugin-vue2-jsx';
import autoprefixer from 'autoprefixer';
import { getHashDigest } from 'loader-utils';
import px2vw from './postcss-plugins/px2vw';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    vue2jsx({
      include: /.(js|ts|jsx|tsx)$/,
      babelPlugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'],
      vModel: true,
      vOn: true,
    }),
  ],
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
        find: /^~/,
        replacement: '',
      },
    ],
  },
  define: {
    'process.env': {
      VUE_APP_DESIGNER: false,
    },
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
    cssTarget: ['> 1%', 'last 2 versions', 'ie >= 9'],
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
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-router', 'vue-i18n'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          'vue-i18n': 'VueI18n',
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
      include: ['src/**/*.?(c|m)[jt]s?(x)'],
      exclude: ['**/stories/**', '**/api.ts'],
    },
    setupFiles: ['./test/setup.js'],
    environmentOptions: {
      jsdom: {
        // i-ico.vue/icon.js 要求文档必须有一个 script 标签
        html: '<!DOCTYPE html><html><head><meta charset="UTF-8" /><script></script></head><body></body></html>',
      },
    },
  },
});
