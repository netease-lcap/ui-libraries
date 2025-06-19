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
        // ide: {
        //   setters: {
        //     rootPath: path.resolve(rootPath, '../../setters'),
        //     entries: {
        //       ExInputSetter: 'src/setters/InputSetter.vue',
        //       ExNormalSetter: 'src/setters/NormalSetter.vue',
        //     },
        //   },
        // },
        modules: {
          entries: {
            install: 'src/install',
            utils: 'src/utils',
          },
          tsconfigPath: 'tsconfig.build.json',
        },
        i18n: {
          'zh-CN': './src/locale/langs/zh-cn.json',
          'en-US': './src/locale/langs/en.json',
          ja: './src/locale/langs/ja.json',
        },
        reportCSSInfo: {
          enabled: true,
          verbose: false,
          warningIgnore: [
            /-(fade|transition)-(enter|leave)-/,
            /^\.el-button-group/,
            /^\.el-input-group/,
            /^\.el-select-group/,
            /^\.el-textarea/,
            /^\.el-table-v2/,
            /^\.el-tooltip-v2/,
            /^\.el-col-|=el-col-/,
            /^\.el-color-/,
            /^\.el-loading-/,
          ],
          extraComponentMap: {
            ElIcon: {
              selectorPrefixMap: {
                'el-icon-loading': true,
              },
            },
            ElButton: {
              mainSelectorMap: {
                '.el-button,.el-button.is-round': true,
              },
            },
            ElBreadcrumb: {
              mainSelectorMap: {
                '.el-breadcrumb__separator': false,
              },
            },
            ElBreadcrumbItem: {
              mainSelectorMap: {
                '.el-breadcrumb__item': true,
                '.el-breadcrumb__inner': false,
              },
            },
            ElDescriptionsItem: {
              selectorPrefixMap: {
                'el-descriptions__cell': true,
                'el-descriptions__label': false,
                'el-descriptions__content': false,
              },
            },
            ElDropdownItem: {
              selectorPrefixMap: {
                'el-dropdown-menu__item': true,
              },
            },
            ElOption: {
              selectorPrefixMap: {
                'el-select-dropdown__item': true,
              },
            },
            ElCheckbox: {
              selectorPrefixMap: {
                'el-checkbox-button': false,
              },
            },
            ElTabPane: {
              mainSelectorMap: {
                '.el-tab-pane': true,
              },
            },
            ElForm: {
              selectorPrefixMap: {
                'el-form-item': true,
              },
            },
            ElFormItemPro: {
              selectorPrefixMap: {
                'el-form-item': true,
              },
            },
            ElCalendar: {
              selectorPrefixMap: {
                'el-calendar-table': false,
              },
            },
            ElCascader: {
              selectorPrefixMap: {
                'el-cascader-panel': false,
                'el-cascader-menu': false,
                'el-cascader-node': false,
              },
            },
            ElCollapse: {
              selectorPrefixMap: {
                'el-collapse': true,
                'el-collapse-item': false,
              },
            },
            ElDropdown: {
              selectorPrefixMap: {
                'el-dropdown-menu': false,
              },
            },
            ElSelect: {
              selectorPrefixMap: {
                'el-select__popper': true,
                'el-select-dropdown': false,
              },
            },
            ElTable: {
              selectorPrefixMap: {
                'el-table-filter': false,
                'el-table-column': false,
              },
              depComponentMap: {
                ElPagination: false,
              },
            },
            ElTableColumn: {
              hideSelectorPrefixes: ['el-table-column'],
            },
            ElProgress: {
              selectorPrefixMap: {
                'el-progress-bar': false,
              },
            },
            ElTag: {
              mainSelectorMap: {
                '.el-tag,.el-tag.el-tag--primary': true,
              },
            },
            ElTransfer: {
              selectorPrefixMap: {
                'el-transfer-panel': false,
              },
            },
            ElTree: {
              selectorPrefixMap: {
                'el-tree-node': false,
              },
            },
            ElTreeSelect: {
              depComponentMap: {
                ElSelect: true,
                ElTree: false,
              },
            },
            ElDatePicker: {
              depComponentMap: {
                ElInput: true,
              },
            },
            ElTimePicker: {
              mainSelectorMap: {
                '.el-time-picker': true,
              },
              depComponentMap: {
                ElInput: true,
              },
            },
            ElTimeSelect: {
              mainSelectorMap: {
                '.el-time-select': true,
              },
              depComponentMap: {
                ElSelect: true,
              },
            },
            ElUpload: {
              selectorPrefixMap: {
                'el-upload': false,
                'el-upload-dragger': false,
                'el-upload-list': false,
                'el-upload-cover': false,
              },
            },
            ElMention: {
              selectorPrefixMap: {
                'el-mention-dropdown': false,
              },
            },
            ElFlex: {
              hideSelectorRegexps: [/>\*/],
            },
            ElAbsoluteLayout: {
              hideSelectorRegexps: [/>\*/],
            },
            ElRow: {
              hideSelectorRegexps: [/>\*/],
            },
            ElCol: {
              hideSelectorRegexps: [/>\*/],
            },
            ...batchDepCSSInfo([
              'ElCascader',
              'ElCheckboxGroup',
              'ElDatePicker',
              'ElInput',
              'ElInputNumber',
              'ElInputTag',
              'ElRadioGroup',
              'ElRate',
              'ElSelect',
              'ElSlider',
              'ElSwitch',
              'ElTimePicker',
              'ElTimeSelect',
              'ElTransfer',
              'ElTreeSelect',
            ], (oldName) => oldName.replace(/^El/, 'ElForm')),
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
        name: 'ElementPlus',
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
