/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';
import vue2 from '@vitejs/plugin-vue2';
import vue2jsx from '@vitejs/plugin-vue2-jsx';
import autoprefixer from 'autoprefixer';
import { getHashDigest } from 'loader-utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const VueTplCompiler = require('./vue-template-compiler');

VueTplCompiler.parse = VueTplCompiler.parseComponent;
// 设置测试运行的时区
process.env.TZ = 'Asia/Shanghai';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2({
      template: {
        compiler: VueTplCompiler,
      },
    }),
    vue2jsx({
      include: /.(jsx|tsx)$/,
      babelPlugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'],
      vModel: true,
      functional: false,
      injectH: true,
      vOn: true,
      compositionAPI: false,
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.vue', '.mjs', '.cjs', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'cloud-ui.vusion': path.resolve(__dirname, './src'),
      'swiper/swiper-bundle.esm.js': path.resolve(__dirname, './node_modules/swiper/swiper-bundle.esm.js'),
    },
  },
  define: {
    'process.env': {
      VUE_APP_DESIGNER: false,
    },
  },
  css: {
    modules: {
      generateScopedName: (name, filename) => {
        const rootPath = path.resolve(__dirname, './src');
        const request = path.relative(rootPath, filename.replace(/\.vue[\\/].*$/, ''));
        const tmpPath = filename
          .substring(0, filename.indexOf('?'))
          .replace(/\.vue[\\/]/g, '_')
          .replace(/\.(vue|css)$/g, '')
          .replace(/_(module|index)$/, '');
        const vueName = path.basename(tmpPath);
        const content = ['CloudUI', request].join('+');
        const hash = getHashDigest(content, 'md5', 'base64', 8);
        let scopedName = vueName;

        if (name !== 'root') {
          scopedName = `${scopedName}_${name}`;
        }

        // eslint-disable-next-line prefer-regex-literals
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
      ],
    },
  },
  build: {
    cssCodeSplit: false,
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    lib: {
      entry: 'src/index',
      name: 'CloudUI',
      formats: ['umd'],
      fileName: () => 'index.js',
    },
    outDir: 'dist-theme',
    modulePreload: false,
    sourcemap: true,
    minify: true,
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
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './test/coverage',
      include: ['src/components/**/*.?(c|m)[jt]s?(x)', 'src/components/**/*.vue'],
      exclude: ['src/**/stories/**', 'src/**/tests/*', 'src/**/demos/*', 'src/**/api.ts', 'src/components/*/index.js'],
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
