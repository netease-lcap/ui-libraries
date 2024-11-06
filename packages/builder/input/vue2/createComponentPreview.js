import { ComponentWrap } from 'virtual:lcap-theme-preview-wrap.js';
import { sendRenderOk } from '../events';
import './global.css';
import styles from './index.module.css';
import cssInfo from './index.css-info-desc.json';
import { upperFirst, camelCase } from 'lodash';

Object.assign(cssInfo['ElCollapse'], cssInfo['ElCollapseItem']);
Object.assign(cssInfo['ElDescriptions'], cssInfo['ElDescriptionsItem']);
// Object.assign(cssInfo['ElDropdown'], cssInfo['ElDropdownItem']);
cssInfo['ElForm'] = Object.assign({}, cssInfo['ElFormItem']);
Object.assign(cssInfo['ElMenu'], cssInfo['ElMenuItem'], cssInfo['ElSubmenu']);
Object.assign(cssInfo['ElSkeleton'], cssInfo['ElSkeletonItem']);
Object.assign(cssInfo['ElTimeline'], cssInfo['ElTimelineItem']);

export default (stories) => {
  if (window.THEME_INFO && window.THEME_INFO.components) {
    stories = stories.map((c) => {
      const tIndex = window.THEME_INFO.components.findIndex((tc) => tc.name.toLowerCase() === c.name.toLowerCase());
      const it = window.THEME_INFO.components[tIndex];
      return {
        ...c,
        title: it ? it.title : '',
        group: it ? it.group : '',
        orderIndex: tIndex,
      };
    }).filter((c) => c.orderIndex > -1).sort((a, b) => a.orderIndex - b.orderIndex);
  }

  return {
    name: 'ThemeComponentPreviews',
    props: {
      componentNames: {
        type: Array,
        default: () => [],
      },
      onActive: {
        type: Function,
      },
    },
    data() {
      return {
        activeName: '',
        source: '',
        sourceDataUrl: '',
        target: '',
        targetDataUrl: '',
        prompt: '',
        quota: 0,
        answer: '',
        loading: false,
        result: '',
        resultDataUrl: '',
        remark: '',
        loading2: false,
      };
    },
    computed: {
      visibleStories() {
        if (!this.componentNames || this.componentNames.length === 0) {
          return stories;
        }

        return stories.filter((c) => this.componentNames.includes(c.name));
      },
    },
    mounted() {
      sendRenderOk();
      window.addEventListener('message', this.handleMessage);

      fetch('/api/aiCSS/quota', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()).then((json) => {
        this.quota = json.quota || 0;
      });
    },
    beforeDestroy() {
      window.removeEventListener('message', this.handleMessage);
    },
    methods: {
      handleClick(name) {
        this.activeName = name;
        // eslint-disable-next-line no-unused-expressions
        this.onActive && this.onActive(name);
      },
      handleMessage(e) {
        if (!e.data) {
          return;
        }

        const { from, type, data } = e.data;
        if (from !== 'lcap' || type !== 'scrollToComponent') {
          return;
        }

        this.activeName = data;
      },
      scrollToElement() {
        const element = document.getElementById(this.activeName);
        if (!element) {
          return;
        }

        element.scrollIntoView();
      },
    },
    watch: {
      activeName() {
        this.$nextTick(() => this.scrollToElement());
      },
    },
    render(h) {
      return h('div', { class: styles.root },
        [
          h(
            'div',
            {
              class: styles.componentPreview,
            },
            this.visibleStories.map((c) => h(ComponentWrap, {
              key: c.name,
              props: {
                name: c.name,
                demo: c.demo,
                title: c.title || c.name,
                actived: c.name === this.activeName,
              },
              on: {
                click: () => this.handleClick(c.name),
              },
            })),
          ),
          h('div', { class: styles.sidebar }, [
            h('el-form-pro', {
              class: styles.form,
              attrs: {
                labelWidthType: 'large',
              },
            }, [
              h('el-form-item-pro', {
                attrs: {
                  label: '当前组件选择器：',
                  requiredMark: true,
                },
              }, [this.activeName ? h('ul', {
                class: styles.selectorList,
              }, Object.keys(cssInfo[upperFirst(camelCase(this.activeName))]).map((text) => h('li', [text]))) : '请先选择一个组件！']),
              h('el-form-item-pro', {
                attrs: {
                  label: '原组件截图：',
                  requiredMark: true,
                },
              }, [
                h('el-upload-pro', {
                  attrs: {
                    theme: 'image',
                    draggable: true,
                    uploadPastedFiles: true,
                  },
                  on: {
                    'select-change': (files) => {
                      this.source = files[0];
                    },
                  },
                }),
              ]),
              h('el-form-item-pro', {
                attrs: {
                  label: '期望组件截图：',
                  requiredMark: true,
                },
              }, [
                h('el-upload-pro', {
                  attrs: {
                    theme: 'image',
                    draggable: true,
                    uploadPastedFiles: true,
                  },
                  on: {
                    'select-change': (files) => {
                      this.target = files[0];
                    },
                  },
                }),
              ]),

              h('el-form-item-pro', {
                attrs: {
                  label: '附加描述：',
                  requiredMark: true,
                },
              }, [
                h('el-textarea-pro', {
                  attrs: {
                    value: this.prompt,
                    autoSize: true,
                  },
                  style: {
                    width: '100%',
                  },
                  on: {
                    change: (value) => {
                      this.prompt = value;
                    },
                  },
                }),
              ]),
              h('el-form-item-pro', {
                attrs: {
                  label: '　',
                },
              }, [
                h('el-button', {
                  attrs: {
                    text: 'AI 生成 CSS',
                    type: 'primary',
                    disabled: !this.activeName || !this.source || !this.target || this.quota <= 0,
                    loading: this.loading,
                  },
                  on: {
                    click: async () => {
                      if (!this.activeName) return this.$message.error('请先选择一个组件！');
                      if (!this.source) return this.$message.error('请先上传原组件截图！');
                      if (!this.target) return this.$message.error('请先上传期望组件截图！');

                      this.loading = true;
                      try {
                        // get data Url base64 from File
                        this.sourceDataUrl = await new Promise((resolve) => {
                          const reader = new FileReader();
                          reader.onload = (e) => resolve(e.target.result);
                          reader.readAsDataURL(this.source);
                        });
                        this.targetDataUrl = await new Promise((resolve) => {
                          const reader = new FileReader();
                          reader.onload = (e) => resolve(e.target.result);
                          reader.readAsDataURL(this.target);
                        });
                        
                        const componentName = upperFirst(camelCase(this.activeName));
                        const res = await fetch('/api/aiCSS/completion', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            selectors: Object.keys(cssInfo[componentName]),
                            source: this.sourceDataUrl,
                            target: this.targetDataUrl,
                            prompt: this.prompt,
                          }),
                        });

                        const json = await res.json();
                        if (json.code !== 200) throw new Error(json.message);

                        this.answer = json.result;
                        this.quota = json.quota;
                        const styleEl = document.createElement('style');
                        styleEl.innerHTML = this.answer;
                        document.head.appendChild(styleEl);

                        this.$message.success('生成 CSS 成功！');
                      } catch (e) {
                        this.$message.error('生成 CSS 失败！');
                      } finally {
                        this.loading = false;
                      }
                    },
                  }
                }),
              ]),
            ]),
            h('p', { class: styles.quota }, `剩余 AI 生成次数：${this.quota}，配额请找赵雨森申请！`),
            h('h3', ['效果评价上报：', h('el-button', {
              attrs: {
                text: '上报截图和评价',
                type: 'success',
                loading: this.loading2,
                disabled: !this.answer || !this.sourceDataUrl || !this.targetDataUrl || !this.result,
              },
              style: {
                float: 'right',
                marginTop: '-6px',
              },
              on: {
                click: async () => {
                  if (!this.sourceDataUrl || !this.targetDataUrl) return this.$message.error('请先调用 AI！');
                  if (!this.result) return this.$message.error('请上传结果截图！');

                  this.loading2 = true;
                  try {
                    const componentName = upperFirst(camelCase(this.activeName));
                    
                    this.resultDataUrl = await new Promise((resolve) => {
                      const reader = new FileReader();
                      reader.onload = (e) => resolve(e.target.result);
                      reader.readAsDataURL(this.result);
                    });

                    const res = await fetch('/api/aiCSS/report', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        createdTime: new Date().toJSON(), 
                        selectors: '', // Object.keys(cssInfo[componentName]).join('\n'),
                        componentName,
                        source: this.sourceDataUrl,
                        target: this.targetDataUrl,
                        result: this.resultDataUrl,
                        prompt: this.prompt,
                        answer: this.answer,
                        remark: this.remark,
                      }),
                    });
                    const json = await res.json();
                    if (json.code !== 200) throw new Error(json.message);

                    this.$message.success('上报成功！');
                  } catch (e) {
                    this.$message.error('上报失败！');
                  } finally {
                    this.loading2 = false;
                  }
                },
              },
            })]),
            h('el-form-pro', {
              class: styles.form,
              attrs: {
                labelWidthType: 'large',
              },
            }, [
              h('el-form-item-pro', {
                attrs: {
                  label: '结果截图：',
                  help: '由于浏览器的安全限制，需要手动截取最终的效果图',
                  // helpIsSlot: true,
                  requiredMark: true,
                },
              }, [
                // h('template', { slot: 'help' }, '由于浏览器的安全限制，需要手动截取最终的效果图'),
                h('el-upload-pro', {
                  attrs: {
                    theme: 'image',
                    draggable: true,
                    uploadPastedFiles: true,
                  },
                  on: {
                    'select-change': (files) => {
                      this.result = files[0];
                    },
                  },
                }),
              ]),
              h('el-form-item-pro', {
                attrs: {
                  label: '评价：',
                },
              }, [
                h('el-textarea-pro', {
                  attrs: {
                    value: this.remark,
                    autoSize: true,
                  },
                  style: {
                    width: '100%',
                  },
                  on: {
                    change: (value) => {
                      this.remark = value;
                    },
                  },
                }),
              ]),
            ]),
            h('pre', { class: styles.code }, this.answer),
          ]),
        ],
      );
    },
  };
};
