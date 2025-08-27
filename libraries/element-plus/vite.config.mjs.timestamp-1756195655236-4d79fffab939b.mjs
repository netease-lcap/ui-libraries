// vite.config.mjs
import { defineConfig } from "file:///Users/songrui/Desktop/ui-libraries/node_modules/.pnpm/vite@6.2.5_@types+node@20.11.26_jiti@1.21.0_less@4.2.0_terser@5.26.0_yaml@2.7.0/node_modules/vite/dist/node/index.js";
import path from "node:path";
import fs from "file:///Users/songrui/Desktop/ui-libraries/node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/index.js";
import vue from "file:///Users/songrui/Desktop/ui-libraries/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vite@6.2.5_@types+node@20.11.26_jiti@1.21.0_less@4.2.0_terser@_187bca9466f3bdfe6d213c1d48bc340d/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/songrui/Desktop/ui-libraries/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.1.1_vite@6.2.5_@types+node@20.11.26_jiti@1.21.0_less@4.2.0_ter_4ff222c9af60a6a051a6d1f70a821f66/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { createGenScopedName, batchDepCSSInfo, lcapPlugin } from "file:///Users/songrui/Desktop/ui-libraries/packages/builder/lib/index.js";
process.env.TZ = "Asia/Shanghai";
var rootPath = process.cwd();
var vite_config_default = defineConfig(({ command }) => {
  const pkgInfo = fs.readJSONSync(path.resolve(rootPath, "package.json"), {});
  return {
    plugins: [
      vue(),
      vueJsx(),
      lcapPlugin({
        type: "nasl.ui",
        framework: "vue3",
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
            "components/el-config-provider/index": "src/components/el-config-provider/index",
            install: "src/install",
            utils: "src/utils"
          },
          tsconfigPath: "tsconfig.build.json"
        },
        i18n: {
          "zh-CN": "./src/locale/langs/zh-cn.json",
          "en-US": "./src/locale/langs/en.json",
          ja: "./src/locale/langs/ja.json"
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
            /^\.el-loading-/
          ],
          extraComponentMap: {
            ElIcon: {
              selectorPrefixMap: {
                "el-icon-loading": true
              }
            },
            ElButton: {
              mainSelectorMap: {
                ".el-button,.el-button.is-round": true
              }
            },
            ElBreadcrumb: {
              mainSelectorMap: {
                ".el-breadcrumb__separator": false
              }
            },
            ElBreadcrumbItem: {
              mainSelectorMap: {
                ".el-breadcrumb__item": true,
                ".el-breadcrumb__inner": false
              }
            },
            ElDescriptionsItem: {
              selectorPrefixMap: {
                "el-descriptions__cell": true,
                "el-descriptions__label": false,
                "el-descriptions__content": false
              }
            },
            ElDropdownItem: {
              selectorPrefixMap: {
                "el-dropdown-menu__item": true
              }
            },
            ElOption: {
              selectorPrefixMap: {
                "el-select-dropdown__item": true
              }
            },
            ElCheckbox: {
              selectorPrefixMap: {
                "el-checkbox-button": false
              }
            },
            ElTabPane: {
              mainSelectorMap: {
                ".el-tab-pane": true
              }
            },
            ElForm: {
              selectorPrefixMap: {
                "el-form-item": true
              }
            },
            ElFormItemPro: {
              selectorPrefixMap: {
                "el-form-item": true
              }
            },
            ElCalendar: {
              selectorPrefixMap: {
                "el-calendar-table": false
              }
            },
            ElCascader: {
              selectorPrefixMap: {
                "el-cascader-panel": false,
                "el-cascader-menu": false,
                "el-cascader-node": false
              }
            },
            ElCollapse: {
              selectorPrefixMap: {
                "el-collapse": true,
                "el-collapse-item": false
              }
            },
            ElDropdown: {
              selectorPrefixMap: {
                "el-dropdown-menu": false
              }
            },
            ElSelect: {
              selectorPrefixMap: {
                "el-select__popper": true,
                "el-select-dropdown": false
              }
            },
            ElTable: {
              selectorPrefixMap: {
                "el-table-filter": false,
                "el-table-column": false
              },
              depComponentMap: {
                ElPagination: false
              }
            },
            ElTableColumn: {
              hideSelectorPrefixes: ["el-table-column"]
            },
            ElProgress: {
              selectorPrefixMap: {
                "el-progress-bar": false
              }
            },
            ElTag: {
              mainSelectorMap: {
                ".el-tag,.el-tag.el-tag--primary": true
              }
            },
            ElTransfer: {
              selectorPrefixMap: {
                "el-transfer-panel": false
              }
            },
            ElTree: {
              selectorPrefixMap: {
                "el-tree-node": false
              }
            },
            ElTreeSelect: {
              depComponentMap: {
                ElSelect: true,
                ElTree: false
              }
            },
            ElDatePicker: {
              depComponentMap: {
                ElInput: true
              }
            },
            ElTimePicker: {
              mainSelectorMap: {
                ".el-time-picker": true
              },
              depComponentMap: {
                ElInput: true
              }
            },
            ElTimeSelect: {
              mainSelectorMap: {
                ".el-time-select": true
              },
              depComponentMap: {
                ElSelect: true
              }
            },
            ElUpload: {
              selectorPrefixMap: {
                "el-upload": false,
                "el-upload-dragger": false,
                "el-upload-list": false,
                "el-upload-cover": false
              }
            },
            ElMention: {
              selectorPrefixMap: {
                "el-mention-dropdown": false
              }
            },
            ElFlex: {
              hideSelectorRegexps: [/>\*/]
            },
            ElAbsoluteLayout: {
              hideSelectorRegexps: [/>\*/]
            },
            ElRow: {
              hideSelectorRegexps: [/>\*/]
            },
            ElCol: {
              hideSelectorRegexps: [/>\*/]
            },
            ...batchDepCSSInfo(
              [
                "ElCascader",
                "ElCheckboxGroup",
                "ElDatePicker",
                "ElInput",
                "ElInputNumber",
                "ElInputTag",
                "ElRadioGroup",
                "ElRate",
                "ElSelect",
                "ElSlider",
                "ElSwitch",
                "ElTimePicker",
                "ElTimeSelect",
                "ElTransfer",
                "ElTreeSelect"
              ],
              (oldName) => oldName.replace(/^El/, "ElForm")
            )
          }
        }
      })
    ],
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".jsx", ".vue", ".mjs", ".cjs", ".json"],
      alias: {
        "@": path.resolve(rootPath, "./src"),
        "@ep-test": path.resolve(rootPath, "./ep-test"),
        // 'element-plus': path.resolve(rootPath, 'node_modules/element-plus'),
        "element-plus/es": path.resolve(rootPath, "node_modules/element-plus/es"),
        "element-plus/lib": path.resolve(rootPath, "node_modules/element-plus/lib")
      }
    },
    define: {
      "process.env": {
        VUE_APP_DESIGNER: false,
        NODE_ENV: command === "build" ? "production" : "development",
        VUE_IS_DEVTOOLS: command === "build"
      }
    },
    css: {
      modules: {
        generateScopedName: createGenScopedName(pkgInfo.name, "./src")
      }
    },
    build: {
      cssCodeSplit: false,
      target: ["es2020", "edge88", "firefox78", "chrome56", "safari14"],
      lib: {
        entry: "src/index",
        name: "ElementPlus",
        cssFileName: "index"
      },
      rollupOptions: {
        external: ["vue", "vue-i18n", "vuex", "pinia", "vue-router"],
        output: {
          globals: {
            vue: "Vue",
            "vue-router": "VueRouter",
            "vue-i18n": "VueI18n",
            vuex: "Vuex",
            pinia: "Pinia"
          }
        }
      },
      sourcemap: true
    },
    test: {
      environment: "jsdom",
      // 显示更详细的测试日志
      verbose: true,
      // 输出测试执行时间
      reporters: ["default", "verbose"]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3NvbmdydWkvRGVza3RvcC91aS1saWJyYXJpZXMvbGlicmFyaWVzL2VsZW1lbnQtcGx1c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3NvbmdydWkvRGVza3RvcC91aS1saWJyYXJpZXMvbGlicmFyaWVzL2VsZW1lbnQtcGx1cy92aXRlLmNvbmZpZy5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3NvbmdydWkvRGVza3RvcC91aS1saWJyYXJpZXMvbGlicmFyaWVzL2VsZW1lbnQtcGx1cy92aXRlLmNvbmZpZy5tanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4JztcbmltcG9ydCB7IGNyZWF0ZUdlblNjb3BlZE5hbWUsIGJhdGNoRGVwQ1NTSW5mbywgbGNhcFBsdWdpbiB9IGZyb20gJ0BsY2FwL2J1aWxkZXInO1xuXG4vLyBcdThCQkVcdTdGNkVcdTZENEJcdThCRDVcdThGRDBcdTg4NENcdTc2ODRcdTY1RjZcdTUzM0FcbnByb2Nlc3MuZW52LlRaID0gJ0FzaWEvU2hhbmdoYWknO1xuY29uc3Qgcm9vdFBhdGggPSBwcm9jZXNzLmN3ZCgpO1xuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCB9KSA9PiB7XG4gIGNvbnN0IHBrZ0luZm8gPSBmcy5yZWFkSlNPTlN5bmMocGF0aC5yZXNvbHZlKHJvb3RQYXRoLCAncGFja2FnZS5qc29uJyksIHt9KTtcblxuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSgpLFxuICAgICAgdnVlSnN4KCksXG4gICAgICBsY2FwUGx1Z2luKHtcbiAgICAgICAgdHlwZTogJ25hc2wudWknLFxuICAgICAgICBmcmFtZXdvcms6ICd2dWUzJyxcbiAgICAgICAgcG5wbTogdHJ1ZSxcbiAgICAgICAgLy8gaWRlOiB7XG4gICAgICAgIC8vICAgc2V0dGVyczoge1xuICAgICAgICAvLyAgICAgcm9vdFBhdGg6IHBhdGgucmVzb2x2ZShyb290UGF0aCwgJy4uLy4uL3NldHRlcnMnKSxcbiAgICAgICAgLy8gICAgIGVudHJpZXM6IHtcbiAgICAgICAgLy8gICAgICAgRXhJbnB1dFNldHRlcjogJ3NyYy9zZXR0ZXJzL0lucHV0U2V0dGVyLnZ1ZScsXG4gICAgICAgIC8vICAgICAgIEV4Tm9ybWFsU2V0dGVyOiAnc3JjL3NldHRlcnMvTm9ybWFsU2V0dGVyLnZ1ZScsXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgIH0sXG4gICAgICAgIC8vIH0sXG4gICAgICAgIG1vZHVsZXM6IHtcbiAgICAgICAgICBlbnRyaWVzOiB7XG4gICAgICAgICAgICAnY29tcG9uZW50cy9lbC1jb25maWctcHJvdmlkZXIvaW5kZXgnOiAnc3JjL2NvbXBvbmVudHMvZWwtY29uZmlnLXByb3ZpZGVyL2luZGV4JyxcbiAgICAgICAgICAgIGluc3RhbGw6ICdzcmMvaW5zdGFsbCcsXG4gICAgICAgICAgICB1dGlsczogJ3NyYy91dGlscycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0c2NvbmZpZ1BhdGg6ICd0c2NvbmZpZy5idWlsZC5qc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAgaTE4bjoge1xuICAgICAgICAgICd6aC1DTic6ICcuL3NyYy9sb2NhbGUvbGFuZ3MvemgtY24uanNvbicsXG4gICAgICAgICAgJ2VuLVVTJzogJy4vc3JjL2xvY2FsZS9sYW5ncy9lbi5qc29uJyxcbiAgICAgICAgICBqYTogJy4vc3JjL2xvY2FsZS9sYW5ncy9qYS5qc29uJyxcbiAgICAgICAgfSxcbiAgICAgICAgcmVwb3J0Q1NTSW5mbzoge1xuICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgdmVyYm9zZTogZmFsc2UsXG4gICAgICAgICAgd2FybmluZ0lnbm9yZTogW1xuICAgICAgICAgICAgLy0oZmFkZXx0cmFuc2l0aW9uKS0oZW50ZXJ8bGVhdmUpLS8sXG4gICAgICAgICAgICAvXlxcLmVsLWJ1dHRvbi1ncm91cC8sXG4gICAgICAgICAgICAvXlxcLmVsLWlucHV0LWdyb3VwLyxcbiAgICAgICAgICAgIC9eXFwuZWwtc2VsZWN0LWdyb3VwLyxcbiAgICAgICAgICAgIC9eXFwuZWwtdGV4dGFyZWEvLFxuICAgICAgICAgICAgL15cXC5lbC10YWJsZS12Mi8sXG4gICAgICAgICAgICAvXlxcLmVsLXRvb2x0aXAtdjIvLFxuICAgICAgICAgICAgL15cXC5lbC1jb2wtfD1lbC1jb2wtLyxcbiAgICAgICAgICAgIC9eXFwuZWwtY29sb3ItLyxcbiAgICAgICAgICAgIC9eXFwuZWwtbG9hZGluZy0vLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgZXh0cmFDb21wb25lbnRNYXA6IHtcbiAgICAgICAgICAgIEVsSWNvbjoge1xuICAgICAgICAgICAgICBzZWxlY3RvclByZWZpeE1hcDoge1xuICAgICAgICAgICAgICAgICdlbC1pY29uLWxvYWRpbmcnOiB0cnVlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEVsQnV0dG9uOiB7XG4gICAgICAgICAgICAgIG1haW5TZWxlY3Rvck1hcDoge1xuICAgICAgICAgICAgICAgICcuZWwtYnV0dG9uLC5lbC1idXR0b24uaXMtcm91bmQnOiB0cnVlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEVsQnJlYWRjcnVtYjoge1xuICAgICAgICAgICAgICBtYWluU2VsZWN0b3JNYXA6IHtcbiAgICAgICAgICAgICAgICAnLmVsLWJyZWFkY3J1bWJfX3NlcGFyYXRvcic6IGZhbHNlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEVsQnJlYWRjcnVtYkl0ZW06IHtcbiAgICAgICAgICAgICAgbWFpblNlbGVjdG9yTWFwOiB7XG4gICAgICAgICAgICAgICAgJy5lbC1icmVhZGNydW1iX19pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAnLmVsLWJyZWFkY3J1bWJfX2lubmVyJzogZmFsc2UsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRWxEZXNjcmlwdGlvbnNJdGVtOiB7XG4gICAgICAgICAgICAgIHNlbGVjdG9yUHJlZml4TWFwOiB7XG4gICAgICAgICAgICAgICAgJ2VsLWRlc2NyaXB0aW9uc19fY2VsbCc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ2VsLWRlc2NyaXB0aW9uc19fbGFiZWwnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnZWwtZGVzY3JpcHRpb25zX19jb250ZW50JzogZmFsc2UsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRWxEcm9wZG93bkl0ZW06IHtcbiAgICAgICAgICAgICAgc2VsZWN0b3JQcmVmaXhNYXA6IHtcbiAgICAgICAgICAgICAgICAnZWwtZHJvcGRvd24tbWVudV9faXRlbSc6IHRydWUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRWxPcHRpb246IHtcbiAgICAgICAgICAgICAgc2VsZWN0b3JQcmVmaXhNYXA6IHtcbiAgICAgICAgICAgICAgICAnZWwtc2VsZWN0LWRyb3Bkb3duX19pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFbENoZWNrYm94OiB7XG4gICAgICAgICAgICAgIHNlbGVjdG9yUHJlZml4TWFwOiB7XG4gICAgICAgICAgICAgICAgJ2VsLWNoZWNrYm94LWJ1dHRvbic6IGZhbHNlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEVsVGFiUGFuZToge1xuICAgICAgICAgICAgICBtYWluU2VsZWN0b3JNYXA6IHtcbiAgICAgICAgICAgICAgICAnLmVsLXRhYi1wYW5lJzogdHJ1ZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFbEZvcm06IHtcbiAgICAgICAgICAgICAgc2VsZWN0b3JQcmVmaXhNYXA6IHtcbiAgICAgICAgICAgICAgICAnZWwtZm9ybS1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFbEZvcm1JdGVtUHJvOiB7XG4gICAgICAgICAgICAgIHNlbGVjdG9yUHJlZml4TWFwOiB7XG4gICAgICAgICAgICAgICAgJ2VsLWZvcm0taXRlbSc6IHRydWUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRWxDYWxlbmRhcjoge1xuICAgICAgICAgICAgICBzZWxlY3RvclByZWZpeE1hcDoge1xuICAgICAgICAgICAgICAgICdlbC1jYWxlbmRhci10YWJsZSc6IGZhbHNlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEVsQ2FzY2FkZXI6IHtcbiAgICAgICAgICAgICAgc2VsZWN0b3JQcmVmaXhNYXA6IHtcbiAgICAgICAgICAgICAgICAnZWwtY2FzY2FkZXItcGFuZWwnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnZWwtY2FzY2FkZXItbWVudSc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICdlbC1jYXNjYWRlci1ub2RlJzogZmFsc2UsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRWxDb2xsYXBzZToge1xuICAgICAgICAgICAgICBzZWxlY3RvclByZWZpeE1hcDoge1xuICAgICAgICAgICAgICAgICdlbC1jb2xsYXBzZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ2VsLWNvbGxhcHNlLWl0ZW0nOiBmYWxzZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFbERyb3Bkb3duOiB7XG4gICAgICAgICAgICAgIHNlbGVjdG9yUHJlZml4TWFwOiB7XG4gICAgICAgICAgICAgICAgJ2VsLWRyb3Bkb3duLW1lbnUnOiBmYWxzZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFbFNlbGVjdDoge1xuICAgICAgICAgICAgICBzZWxlY3RvclByZWZpeE1hcDoge1xuICAgICAgICAgICAgICAgICdlbC1zZWxlY3RfX3BvcHBlcic6IHRydWUsXG4gICAgICAgICAgICAgICAgJ2VsLXNlbGVjdC1kcm9wZG93bic6IGZhbHNlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEVsVGFibGU6IHtcbiAgICAgICAgICAgICAgc2VsZWN0b3JQcmVmaXhNYXA6IHtcbiAgICAgICAgICAgICAgICAnZWwtdGFibGUtZmlsdGVyJzogZmFsc2UsXG4gICAgICAgICAgICAgICAgJ2VsLXRhYmxlLWNvbHVtbic6IGZhbHNlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBkZXBDb21wb25lbnRNYXA6IHtcbiAgICAgICAgICAgICAgICBFbFBhZ2luYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEVsVGFibGVDb2x1bW46IHtcbiAgICAgICAgICAgICAgaGlkZVNlbGVjdG9yUHJlZml4ZXM6IFsnZWwtdGFibGUtY29sdW1uJ10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRWxQcm9ncmVzczoge1xuICAgICAgICAgICAgICBzZWxlY3RvclByZWZpeE1hcDoge1xuICAgICAgICAgICAgICAgICdlbC1wcm9ncmVzcy1iYXInOiBmYWxzZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFbFRhZzoge1xuICAgICAgICAgICAgICBtYWluU2VsZWN0b3JNYXA6IHtcbiAgICAgICAgICAgICAgICAnLmVsLXRhZywuZWwtdGFnLmVsLXRhZy0tcHJpbWFyeSc6IHRydWUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRWxUcmFuc2Zlcjoge1xuICAgICAgICAgICAgICBzZWxlY3RvclByZWZpeE1hcDoge1xuICAgICAgICAgICAgICAgICdlbC10cmFuc2Zlci1wYW5lbCc6IGZhbHNlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEVsVHJlZToge1xuICAgICAgICAgICAgICBzZWxlY3RvclByZWZpeE1hcDoge1xuICAgICAgICAgICAgICAgICdlbC10cmVlLW5vZGUnOiBmYWxzZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFbFRyZWVTZWxlY3Q6IHtcbiAgICAgICAgICAgICAgZGVwQ29tcG9uZW50TWFwOiB7XG4gICAgICAgICAgICAgICAgRWxTZWxlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgRWxUcmVlOiBmYWxzZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFbERhdGVQaWNrZXI6IHtcbiAgICAgICAgICAgICAgZGVwQ29tcG9uZW50TWFwOiB7XG4gICAgICAgICAgICAgICAgRWxJbnB1dDogdHJ1ZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFbFRpbWVQaWNrZXI6IHtcbiAgICAgICAgICAgICAgbWFpblNlbGVjdG9yTWFwOiB7XG4gICAgICAgICAgICAgICAgJy5lbC10aW1lLXBpY2tlcic6IHRydWUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGRlcENvbXBvbmVudE1hcDoge1xuICAgICAgICAgICAgICAgIEVsSW5wdXQ6IHRydWUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRWxUaW1lU2VsZWN0OiB7XG4gICAgICAgICAgICAgIG1haW5TZWxlY3Rvck1hcDoge1xuICAgICAgICAgICAgICAgICcuZWwtdGltZS1zZWxlY3QnOiB0cnVlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBkZXBDb21wb25lbnRNYXA6IHtcbiAgICAgICAgICAgICAgICBFbFNlbGVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFbFVwbG9hZDoge1xuICAgICAgICAgICAgICBzZWxlY3RvclByZWZpeE1hcDoge1xuICAgICAgICAgICAgICAgICdlbC11cGxvYWQnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnZWwtdXBsb2FkLWRyYWdnZXInOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnZWwtdXBsb2FkLWxpc3QnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAnZWwtdXBsb2FkLWNvdmVyJzogZmFsc2UsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRWxNZW50aW9uOiB7XG4gICAgICAgICAgICAgIHNlbGVjdG9yUHJlZml4TWFwOiB7XG4gICAgICAgICAgICAgICAgJ2VsLW1lbnRpb24tZHJvcGRvd24nOiBmYWxzZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFbEZsZXg6IHtcbiAgICAgICAgICAgICAgaGlkZVNlbGVjdG9yUmVnZXhwczogWy8+XFwqL10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRWxBYnNvbHV0ZUxheW91dDoge1xuICAgICAgICAgICAgICBoaWRlU2VsZWN0b3JSZWdleHBzOiBbLz5cXCovXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFbFJvdzoge1xuICAgICAgICAgICAgICBoaWRlU2VsZWN0b3JSZWdleHBzOiBbLz5cXCovXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBFbENvbDoge1xuICAgICAgICAgICAgICBoaWRlU2VsZWN0b3JSZWdleHBzOiBbLz5cXCovXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi5iYXRjaERlcENTU0luZm8oXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnRWxDYXNjYWRlcicsXG4gICAgICAgICAgICAgICAgJ0VsQ2hlY2tib3hHcm91cCcsXG4gICAgICAgICAgICAgICAgJ0VsRGF0ZVBpY2tlcicsXG4gICAgICAgICAgICAgICAgJ0VsSW5wdXQnLFxuICAgICAgICAgICAgICAgICdFbElucHV0TnVtYmVyJyxcbiAgICAgICAgICAgICAgICAnRWxJbnB1dFRhZycsXG4gICAgICAgICAgICAgICAgJ0VsUmFkaW9Hcm91cCcsXG4gICAgICAgICAgICAgICAgJ0VsUmF0ZScsXG4gICAgICAgICAgICAgICAgJ0VsU2VsZWN0JyxcbiAgICAgICAgICAgICAgICAnRWxTbGlkZXInLFxuICAgICAgICAgICAgICAgICdFbFN3aXRjaCcsXG4gICAgICAgICAgICAgICAgJ0VsVGltZVBpY2tlcicsXG4gICAgICAgICAgICAgICAgJ0VsVGltZVNlbGVjdCcsXG4gICAgICAgICAgICAgICAgJ0VsVHJhbnNmZXInLFxuICAgICAgICAgICAgICAgICdFbFRyZWVTZWxlY3QnLFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAob2xkTmFtZSkgPT4gb2xkTmFtZS5yZXBsYWNlKC9eRWwvLCAnRWxGb3JtJyksXG4gICAgICAgICAgICApLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGV4dGVuc2lvbnM6IFsnLmpzJywgJy50cycsICcudHN4JywgJy5qc3gnLCAnLnZ1ZScsICcubWpzJywgJy5janMnLCAnLmpzb24nXSxcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKHJvb3RQYXRoLCAnLi9zcmMnKSxcbiAgICAgICAgJ0BlcC10ZXN0JzogcGF0aC5yZXNvbHZlKHJvb3RQYXRoLCAnLi9lcC10ZXN0JyksXG4gICAgICAgIC8vICdlbGVtZW50LXBsdXMnOiBwYXRoLnJlc29sdmUocm9vdFBhdGgsICdub2RlX21vZHVsZXMvZWxlbWVudC1wbHVzJyksXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMnOiBwYXRoLnJlc29sdmUocm9vdFBhdGgsICdub2RlX21vZHVsZXMvZWxlbWVudC1wbHVzL2VzJyksXG4gICAgICAgICdlbGVtZW50LXBsdXMvbGliJzogcGF0aC5yZXNvbHZlKHJvb3RQYXRoLCAnbm9kZV9tb2R1bGVzL2VsZW1lbnQtcGx1cy9saWInKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBkZWZpbmU6IHtcbiAgICAgICdwcm9jZXNzLmVudic6IHtcbiAgICAgICAgVlVFX0FQUF9ERVNJR05FUjogZmFsc2UsXG4gICAgICAgIE5PREVfRU5WOiBjb21tYW5kID09PSAnYnVpbGQnID8gJ3Byb2R1Y3Rpb24nIDogJ2RldmVsb3BtZW50JyxcbiAgICAgICAgVlVFX0lTX0RFVlRPT0xTOiBjb21tYW5kID09PSAnYnVpbGQnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgbW9kdWxlczoge1xuICAgICAgICBnZW5lcmF0ZVNjb3BlZE5hbWU6IGNyZWF0ZUdlblNjb3BlZE5hbWUocGtnSW5mby5uYW1lLCAnLi9zcmMnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgY3NzQ29kZVNwbGl0OiBmYWxzZSxcbiAgICAgIHRhcmdldDogWydlczIwMjAnLCAnZWRnZTg4JywgJ2ZpcmVmb3g3OCcsICdjaHJvbWU1NicsICdzYWZhcmkxNCddLFxuICAgICAgbGliOiB7XG4gICAgICAgIGVudHJ5OiAnc3JjL2luZGV4JyxcbiAgICAgICAgbmFtZTogJ0VsZW1lbnRQbHVzJyxcbiAgICAgICAgY3NzRmlsZU5hbWU6ICdpbmRleCcsXG4gICAgICB9LFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBleHRlcm5hbDogWyd2dWUnLCAndnVlLWkxOG4nLCAndnVleCcsICdwaW5pYScsICd2dWUtcm91dGVyJ10sXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICAgIHZ1ZTogJ1Z1ZScsXG4gICAgICAgICAgICAndnVlLXJvdXRlcic6ICdWdWVSb3V0ZXInLFxuICAgICAgICAgICAgJ3Z1ZS1pMThuJzogJ1Z1ZUkxOG4nLFxuICAgICAgICAgICAgdnVleDogJ1Z1ZXgnLFxuICAgICAgICAgICAgcGluaWE6ICdQaW5pYScsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgfSxcbiAgICB0ZXN0OiB7XG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcblxuICAgICAgLy8gXHU2NjNFXHU3OTNBXHU2NkY0XHU4QkU2XHU3RUM2XHU3Njg0XHU2RDRCXHU4QkQ1XHU2NUU1XHU1RkQ3XG4gICAgICB2ZXJib3NlOiB0cnVlLFxuICAgICAgLy8gXHU4RjkzXHU1MUZBXHU2RDRCXHU4QkQ1XHU2MjY3XHU4ODRDXHU2NUY2XHU5NUY0XG4gICAgICByZXBvcnRlcnM6IFsnZGVmYXVsdCcsICd2ZXJib3NlJ10sXG4gICAgfSxcbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrVyxTQUFTLG9CQUFvQjtBQUMvWCxPQUFPLFVBQVU7QUFDakIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixTQUFT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
