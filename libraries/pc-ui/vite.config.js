/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';
import { createVuePlugin as vue2 } from '@lcap/vite-plugin-vue2';
import { createGenScopedName, lcapPlugin } from '@lcap/builder';
import autoprefixer from 'autoprefixer';

// 设置测试运行的时区
process.env.TZ = 'Asia/Shanghai';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
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
        framework: 'vue2',
        pnpm: true,
        theme: {
          oldCssVarPath: './src/styles/theme.css',
        },
        i18n: {
          'zh-CN': './src/locale/lang/zh-CN.json',
          'en-US': './src/locale/lang/en-US.json',
          ja: './src/locale/lang/ja.json',
        },
        reportCSSInfo: {
          enabled: true,
          verbose: false,
          extraComponentMap: {
            IIco: {
              selectorPrefixMap: {
                'i-icon': true,
              },
            },
            UCrumb: {
              mainSelectorMap: {
                "[class*=u-crumb___]": true,
              },
            },
            UDescList: {
              mainSelectorMap: {
                "[class*=u-desc-list___]": true,
              },
            },
            UForm: {
              mainSelectorMap: {
                "[class*=u-form___]": true,
              },
            },
            URadios: {
              mainSelectorMap: {
                "[class*=u-radios___]": true,
              },
            },
            UTableView: {
              selectorPrefixMap: {
                'u-table': false,
                'u-table-view_filters-popper': true,
              },
              mainSelectorMap: {
                '[class*=u-table-view_filters-popper___]': true,
              },
              depCompList: ['UPagination'],
              hiddenSelectorPreFixList: ['u-table-view_filter'],
            },
            UTreeViewNew: {
              mainSelectorMap: {
                "[class*=u-tree-view-new___]": true,
              },
            },
            UListComponents: {
              mainSelectorMap: {
                ".u-for-com": true,
                ".u-for-com-frag": false,
                ".u-for-com-item": false,
              },
            },
            UToc: {
              selectorPrefixMap: {
                'u-toc': false,
                'u-toc_wrap': true,
              },
            },
            UCountDown: {
              mainSelectorMap: {
                '[class*=u-count-down]': true,
              },
            },
            UGallery: {
              selectorPrefixMap: {
                'u-gallery_wrap': true,
                'u-gallery_wrapbig': true,
                'u-gallery_wrapsmall': true,
                'swiper\\b[a-z-]+': false,
              },
            },
            UPopupCombination: {
              selectorPrefixMap: {
                'u-popup': true,
              },
            },
            UTreeSelectNew: {
              depCompList: ['UTreeViewNew'],
            },
            URegionSelect: {
              depCompList: [
                {
                  compName: 'UCascader',
                  isResetRoot: false,
                },
              ],
            },
            UDatePicker: {
              selectorPrefixMap: {
                'u-calendar': false,
                'u-date-picker_popper': true,
              },
            },
            UTimePicker: {
              selectorPrefixMap: {
                'u-time-picker_popper_popper': true,
                'u-time-picker_range': true,
              },
            },
            UDateTimePicker: {
              selectorPrefixMap: {
                'u-date-time-picker_popper': true,
              },
              depCompList: ['UDatePicker'],
            },
            UProcessRecord: {
              depCompList: ['UTableView'],
            },
            UProcessMyprocess: {
              depCompList: ['UTabs', 'UTableView', 'UForm', 'UButton'],
            },
            URate: {
              mainSelectorMap: {
                '[class*=u-rate]': true,
              },
            },
            UDropdown: {
              mainSelectorMap: {
                '[class*=u-dropdown_title___]': false,
              },
            },
          },
        },
      }),
    ],
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx', '.vue', '.mjs', '.cjs', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        'cloud-ui.vusion': path.resolve(__dirname, './src'),
        'swiper/swiper-bundle.esm.js': path.resolve(__dirname, './node_modules/swiper/swiper-bundle.esm.js'),
        '@joskii/jflow-core': path.resolve(__dirname, './node_modules/@joskii/jflow-core/dist/jflow.es.min.js'),
        '@joskii/jflow-vue2-plugin': path.resolve(__dirname, './node_modules/@joskii/jflow-vue2-plugin/dist/jflow-vue2-plugin.es.min.js'),
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
      target: ['es2020', 'edge88', 'firefox78', 'chrome56', 'safari14'],
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
        treehake: false,
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
      exclude: ['src/**/demo.test.js'],
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
  };
});
