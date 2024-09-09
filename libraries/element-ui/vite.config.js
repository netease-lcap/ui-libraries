/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs-extra';
import { createVuePlugin as vue2 } from '@lcap/vite-plugin-vue2';
import { createGenScopedName, lcapPlugin } from '@lcap/builder';
import autoprefixer from 'autoprefixer';

// 设置测试运行的时区
process.env.TZ = 'Asia/Shanghai';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const componentVars = fs.readJSONSync('../element-pro/src/styles/variables/vars.json');

  return {
    plugins: [
      vue2({
        jsx: true,
        jsxOptions: {
          vModel: true,
          functional: false,
          injectH: true,
          vOn: true,
          compositionAPI: false,
        },
      }),
      lcapPlugin({
        type: 'nasl.ui',
        framework: 'vue2',
        pnpm: true,
        // theme: {
        //   themeVarCssPath: 'src/styles/theme.css',
        //   useOldCssVarParser: true,
        // },
        i18n: {},
        dependencies: [
          // {
          //   name: '@lcap/pc-ui',
          //   rootPath: path.resolve(__dirname, '../pc-ui'),
          //   config: (c) => {
          //     return {
          //       ...c,
          //       show: false,
          //     };
          //   },
          // },
          {
            name: '@lcap/element-pro',
            rootPath: path.resolve(__dirname, '../element-pro'),
            // config: (c) => {
            //   return {
            //     ...c,
            //     show: false,
            //   };
            // },
          },
        ],
      }),
    ],
    optimizeDeps: {
      include: ['online-svg-icon-vue2'],
    },
    resolve: {
      extensions: [
        '.js',
        '.ts',
        '.tsx',
        '.jsx',
        '.vue',
        '.mjs',
        '.cjs',
        '.json',
      ],
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@element-pro': path.resolve(__dirname, '../element-pro/design'),
        '@element-ui-icons': path.resolve(__dirname, '../element-pro/design/icons/index.js'),
        'swiper/swiper-bundle.esm.js': path.resolve(
          __dirname,
          './node_modules/swiper/swiper-bundle.esm.js',
        ),
        '@joskii/jflow-core': path.resolve(
          __dirname,
          './node_modules/@joskii/jflow-core/dist/jflow.es.min.js',
        ),
        '@joskii/jflow-vue2-plugin': path.resolve(
          __dirname,
          './node_modules/@joskii/jflow-vue2-plugin/dist/jflow-vue2-plugin.es.min.js',
        ),
      },
    },
    define: {
      'process.env': {
        VUE_APP_DESIGNER: false,
        NODE_ENV: command === 'build' ? 'production' : 'development',
      },
    },
    css: {
      modules: {
        generateScopedName: createGenScopedName('CloudUI', './src'),
      },
      preprocessorOptions: {
        less: {
          modifyVars: componentVars,
        },
      },
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['> 1%', 'last 2 versions', 'ie >= 9'],
            grid: true,
          }),
        ],
      },
    },
    build: {
      cssCodeSplit: false,
      target: ['es2020', 'edge88', 'firefox78', 'chrome56', 'safari14'],
      lib: {
        entry: 'src/index',
        name: 'ElementUI',
        formats: ['umd'],
      },
      outDir: 'dist-theme',
      modulePreload: false,
      // sourcemap: true,
      // minify: true,
    },
    test: {
      environment: 'jsdom',
      css: {
        modules: {
          classNameStrategy: 'non-scoped',
        },
      },
      deps: {
        inline: ['vitest-canvas-mock'],
      },
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        reportsDirectory: './test/coverage',
        include: [
          'src/components/**/*.?(c|m)[jt]s?(x)',
          'src/components/**/*.vue',
        ],
        exclude: [
          'src/**/stories/**',
          'src/**/tests/*',
          'src/**/demos/*',
          'src/**/api.ts',
          'src/components/*/index.js',
        ],
      },
      setupFiles: ['./test/setup.js'],
      environmentOptions: {
        jsdom: {
          // i-ico.vue/icon.js 要求文档必须有一个 script 标签
          html:
            '<!DOCTYPE html><html><head><meta charset="UTF-8" /><script></script></head><body></body></html>',
        },
      },
    },
  };
});
