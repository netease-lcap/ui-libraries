import { defineConfig } from 'vite';
import path from 'node:path';
import fs from 'fs-extra';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createGenScopedName, lcapPlugin } from '@lcap/builder';

// 设置测试运行的时区
process.env.TZ = 'Asia/Shanghai';
const rootPath = process.cwd();
// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const pkgInfo = fs.readJSONSync(path.resolve(rootPath, 'package.json'), {});

  return {
    plugins: [
      vue(),
      vueJsx(),
      lcapPlugin({
        type: 'nasl.ui',
        framework: 'vue3',
        pnpm: true,
        theme: {
          previewPages: [
            {
              name: 'dashboard',
              title: 'Dashboard',
              viewport: {
                width: 375,
                height: 815,
              },
            },
            {
              name: 'form',
              title: '表单页',
              viewport: {
                width: 375,
                height: 815,
              },
            },
          ],
          themeComponentFolder: './src/theme/components',
        },
        modules: {
          entries: {
            'components/van-config-provider/index': 'src/components/van-config-provider/index',
            install: 'src/install',
            utils: 'src/utils',
          },
          tsconfigPath: 'tsconfig.build.json',
        },
        i18n: {
          'zh-CN': './src/locale/langs/zh-CN.json',
          'en-US': './src/locale/langs/en-US.json',
          ja: './src/locale/langs/ja-JP.json',
        },
      }),
    ],
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx', '.vue', '.mjs', '.cjs', '.json'],
      alias: {
        '@': path.resolve(rootPath, './src'),
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
        generateScopedName: createGenScopedName(pkgInfo.name, './src'),
      },
    },
    build: {
      cssCodeSplit: false,
      target: ['es2020', 'edge88', 'firefox78', 'chrome56', 'safari14'],
      lib: {
        entry: 'src/index',
        name: 'LcapVant',
        cssFileName: 'index',
      },
      rollupOptions: {
        external: ['vue', 'vue-i18n', 'vuex', 'pinia', 'vue-router'],
        output: {
          globals: {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            'vue-i18n': 'VueI18n',
            vuex: 'Vuex',
            pinia: 'Pinia',
          },
        },
      },
      sourcemap: true,
    },
    test: {
      environment: 'jsdom',
    },
  };
});
