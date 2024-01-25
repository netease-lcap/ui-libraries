/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';
import vue2 from '@vitejs/plugin-vue2';
import vue2jsx from '@vitejs/plugin-vue2-jsx';
import autoprefixer from 'autoprefixer';
import { getHashDigest } from 'loader-utils';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    vue2jsx({
      include: /.(jsx|tsx)$/,
      babelPlugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'],
      vModel: true,
      vOn: true,
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
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './test/coverage',
      include: ['src/**/*.?(c|m)[jt]s?(x)'],
      exclude: ['**/stories/**'],
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
