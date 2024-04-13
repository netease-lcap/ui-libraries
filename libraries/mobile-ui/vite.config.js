/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';
import { createVuePlugin as vue2 } from '@lcap/vite-plugin-vue2';
import { createGenScopedName, lcapPlugin } from '@lcap/builder';
import autoprefixer from 'autoprefixer';
import px2vw from './postcss-plugins/px2vw';

// 设置测试运行的时区
process.env.TZ = 'Asia/Shanghai';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue2({
        jsx: true,
        jsxInclude: /.(js|ts|jsx|tsx)$/,
        jsxOptions: {
          vModel: true,
          functional: false,
          injectH: true,
          vOn: true,
          compositionAPI: false,
        },
      }),
      lcapPlugin({
        framework: 'vue2',
        i18n: {
          'zh-CN': './src/locale/lang/zh-CN/data.json',
        },
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
        generateScopedName: createGenScopedName('vant', './'),
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
      target: ['es2020', 'edge88', 'firefox78', 'chrome56', 'safari14'],
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
          interop: 'compat',
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
