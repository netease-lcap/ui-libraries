import { defineConfig } from 'vite';
import path from 'node:path';
import fs from 'fs-extra';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createGenScopedName, batchDepCSSInfo, lcapPlugin } from '@lcap/builder';

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
        reportCSSInfo: {
          enabled: true,
          verbose: false,
          warningIgnore: [
            /-(fade|transition)-(enter|leave)-/,
            /^\.van-button-group/,
            /^\.van-field-group/,
            /^\.van-select-group/,
            /^\.van-textarea/,
            /^\.van-color-/,
            /^\.van-loading-/,
          ],
          extraComponentMap: {
            VanCheckboxGroup: {
              mainSelectorMap: {
                '.van-checkbox-group': true,
              },
            },
            VanStepperNumber: {
              mainSelectorMap: {
                '.van-stepper': true,
              },
            },
            VanRadioGroup: {
              mainSelectorMap: {
                '.van-radio-group': true,
              },
            },
            VanIndexBar: {
              mainSelectorMap: {
                '.van-index-bar': true,
              },
            },
            VanCollapse: {
              selectorPrefixMap: {
                'van-collapse': true,
              },
              mainSelectorMap: {
                '.van-collapse': true,
              },
            },
            VanCollapseItem: {
              selectorPrefixMap: {
                'van-collapse-item__title': false,
              },
              mainSelectorMap: {
                '.van-collapse-item__title': false,
              },
            },
            VanCellGroup: {
              selectorPrefixMap: {
                'van-cell-group__wrapper': true,
              },
              mainSelectorMap: {
                '.van-cell-group__wrapper': true,
              },
            },
            VanProgress: {
              mainSelectorMap: {
                '[class*=_van-progress-room]': true,
                '.van-progress': false,
              },
            },
            VanBadge: {
              selectorPrefixMap: {
                'van-badge__wrapper': true,
                'van-badge': false,
                'van-badge--fixed': false,
                'van-badge--top-left': false,
                'van-badge--top-right': false,
                'van-badge--bottom-left': false,
                'van-badge--bottom-right': false,
                'van-badge--dot': false,
              },
            },
            VanForm: {
              mainSelectorMap: {
                '.van-form': true,
              },
            },
            VanSlider: {
              mainSelectorMap: {
                '[class*=_van-slider-room]': true,
                '.van-slider': false,
              },
            },
            VanCalendar: {
              selectorPrefixMap: {
                'van-calendar': false,
                'van-calendar__root': true,
              },
              mainSelectorMap: {
                '.van-calendar__root': true,
                '.van-calendar': false,
              },
            },
            VanDatePicker: {
              selectorPrefixMap: {
                'van-date-picker__root': true,
              },
              mainSelectorMap: {
                '.van-date-picker__root': true,
              },
              depComponents: ['VanPicker'],
            },
            VanTimePicker: {
              selectorPrefixMap: {
                'van-time-picker__root': true,
              },
              mainSelectorMap: {
                '.van-time-picker__root': true,
              },
              depComponents: ['VanPicker'],
            },
            VanPicker: {
              mainSelectorMap: {
                '.van-cell': true,
                '.van-field': true,
                '.van-cell--clickable': true,
                '.van-cell.van-cell--clickable.van-field': true,
                // '.van-popup': true,
                '.van-picker': true,
              },
            },
            VanCascader: {
              mainSelectorMap: {
                '.van-cell': true,
                '.van-field': true,
                '.van-cell--clickable': true,
                '.van-cell.van-cell--clickable.van-field': true,
                // '.van-popup': true,
                '.van-cascader': true,
              },
            },
            VanIndexAnchor: {
              selectorPrefixMap: {
                'van-index-anchor': false,
              },
              mainSelectorMap: {
                '.van-index-anchor--root': true,
                '.van-index-anchor': false,
              },
            },
            VanTab: {
              selectorPrefixMap: {
                'van-tab__panel': true,
                'van-tab': true,
                'van-tab--active': true,
                'van-tab--disabled': true,
              },
              mainSelectorMap: {
                '.van-tab__panel': true,
                '.van-tab': true,
                '.van-tab--active': true,
                '.van-tab--disabled': true,
              },
            },
            VanLoading: {
              selectorPrefixMap: {
                'van-loading__root': true,
                'van-loading': false,
              },
              mainSelectorMap: {
                '.van-loading__root': true,
                '.van-loading': false,
              },
            },
            VanPopoverCombination: {
              selectorPrefixMap: {
                // 'van-popover__wrapper': true,
                'van-popover__reference': true,
                'van-popover': true,
              },
              mainSelectorMap: {
                // '.van-popover__wrapper': true,
                '.van-popover__reference': true,
                '.van-popover': true,
              },
            },
            ...batchDepCSSInfo(
              [
                'VanCascader',
                'VanCheckboxGroup',
                'VanDatePicker',
                'VanStepperNumber',
                'VanRadioGroup',
                'VanPicker',
                'VanSlider',
                'VanTimePicker',
              ],
              (oldName) => oldName.replace(/^Van/, 'VanForm'),
            ),
          },
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
