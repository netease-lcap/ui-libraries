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
  const componentVars = fs.readJSONSync('./src/styles/variables/vars.json');

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
        modules: {
          entries: {
            install: 'src/install',
          },
        },
        reportCSSInfo: {
          enabled: true,
          verbose: false,
          extraComponentMap: {
            ElIcon: {
              selectorPrefixMap: {
                'el-icon-loading': true,
              },
              mainSelectorMap: {
                '.el-p-icon': true,
              },
            },
            ElAutocomplete: {
              selectorPrefixMap: {
                'el-autocomplete-suggestion': false,
              },
            },
            ElDropdown: {
              selectorPrefixMap: {
                'el-dropdown-menu': false,
              },
            },
            ElMenu: {
              selectorPrefixMap: {
                'el-menu-item-group': false,
              },
            },
            ElProgress: {
              selectorPrefixMap: {
                'el-progress-bar': false,
              },
            },
            ElImage: {
              selectorPrefixMap: {
                'el-image-preview': false,
              },
            },
            ElCalendar: {
              selectorPrefixMap: {
                'el-calendar-table': false,
              },
            },
            ElListComponents: {
              mainSelectorMap: {
                ".el-list-components": true,
                ".el-list-components__frag": false,
                ".el-list-components__item": false,
              },
            },
            ElOptionPro: {
              selectorPrefixMap: {
                'el-p-select-option': true,
              },
            },
            ElOptionGroupPro: {
              selectorPrefixMap: {
                'el-p-select-option-group': true,
              },
            },
            ElBreadcrumbItem: {
              selectorPrefixMap: {
                'el-breadcrumb__item': true,
              },
            },
            ElRouterView: {
              mainSelectorMap: {
                '.el-router-view': true,
              },
            },
            ElTabPane: {
              mainSelectorMap: {
                '.el-tab-pane': true,
              },
            },
            ElFormItemPro: {
              selectorPrefixMap: {
                'el-p-form__item': true,
              },
            },
            ElDropdownItem: {
              selectorPrefixMap: {
                'el-dropdown-menu__item': true,
              },
            },
            ElCarouselItem: {
              selectorPrefixMap: {
                'el-carousel__item': true,
              },
            },
            ElCol: {
              mainSelectorMap: {
                '.el-col': true,
              },
            },
            ElDrawer: {
              selectorPrefixMap: {
                'el-drawer__wrapper': true,
                'el-drawer': false,
              },
            },
            ElDialog: {
              selectorPrefixMap: {
                'el-dialog__wrapper': true,
                'el-dialog': false,
              },
            },
            ElMessageBox: {
              selectorPrefixMap: {
                'el-message-box__wrapper': true,
                'el-message-box': false,
              },
            },
            ElPopover: {
              mainSelectorMap: {
                '.popper__arrow': false,
              },
            },
            ElPopconfirm: {
              mainSelectorMap: {
                '.el-popover': true,
                '.el-popconfirm': false,
              },
            },
            ElTabs: {
              mainSelectorMap: {
                '.el-tabs': true,
                '.el-tabs--top': true,
              },
            },
            ElSelectPro: {
              selectorPrefixMap: {
                'el-p-select__wrap': true,
                'el-p-select': false,
                'el-p-select-option': false,
              },
              mainSelectorMap: {
                '.el-p-select-option': false,
              },
            },
            ElCascaderPro: {
              mainSelectorMap: {
                '.el-p-cascader': true,
              },
            },
            ElTreeSelectPro: {
              selectorPrefixMap: {
                'narrow-scrollbar': true,
              },
              depCompList: ['ElTreePro', 'ElSelectPro', 'ElInputPro'],
            },
            ElDatePickerPro: {
              mainSelectorMap: {
                '.el-p-date-picker': true,
              },
              depCompList: ['ElSelectInputPro', 'ElInputPro'],
            },
            ElDateTimePickerPro: {
              mainSelectorMap: {
                '.el-p-date-picker': true,
              },
              depCompList: ['ElSelectInputPro', 'ElInputPro'],
            },
            ElTimePickerPro: {
              selectorPrefixMap: {
                'el-p-time-range-picker': true,
              },
              depCompList: ['ElRangeInputPro', 'ElInputPro'],
            },
            ElInputPro: {
              selectorPrefixMap: {
                'el-p-input__wrap': true,
                'el-p-input': false,
              },
            },
            ElTablePro: {
              depCompList: ['ElPaginationPro'],
            },
            ElTooltip: {
              selectorPrefixMap: {
                'el-tooltip__popper': true,
              },
              mainSelectorMap: {
                '.el-tooltip__popper': true,
              },
            },
          },
        },
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
        '@element-pro': path.resolve(__dirname, './design'),
        '@element-ui-icons': path.resolve(__dirname, './design/icons/index.js'),
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
