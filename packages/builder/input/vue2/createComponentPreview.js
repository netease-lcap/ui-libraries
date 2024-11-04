import { ComponentWrap } from 'virtual:lcap-theme-preview-wrap.js';
import { sendRenderOk } from '../events';
import './global.css';
import styles from './index.module.css';
import cssInfo from './index.css-info-desc.json';
import { upperFirst, camelCase } from 'lodash';

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
        target: '',
        quota: 0,
        resultCode: '',
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
                  label: '原组件图片：',
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
                  label: '期望组件图片：',
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
                  label: '　',
                },
              }, [
                h('el-button', {
                  attrs: {
                    text: '用 AI 生成代码',
                    type: 'primary',
                    disabled: !this.activeName || !this.source || !this.target || this.quota <= 0,
                  },
                  on: {
                    click: async () => {
                      if (!this.activeName) return alert('请先选择一个组件！');
                      if (!this.source) return alert('请先上传原组件图片！');
                      if (!this.target) return alert('请先上传期望组件图片！');

                      // get data Url base64 from File
                      const sourceDataUrl = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => resolve(e.target.result);
                        reader.readAsDataURL(this.source);
                      });
                      const targetDataUrl = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => resolve(e.target.result);
                        reader.readAsDataURL(this.target);
                      });
                      
                      const res = await fetch('/api/aiCSS/completion', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          selectors: Object.keys(cssInfo[upperFirst(camelCase(this.activeName))]),
                          source: sourceDataUrl,
                          target: targetDataUrl,
                        }),
                      });

                      const json = await res.json();
                      this.resultCode = json.result;
                      this.quota = json.quota;
                      const styleEl = document.createElement('style');
                      styleEl.innerHTML = this.resultCode;
                      document.head.appendChild(styleEl);
                    },
                  }
                }),
              ]),
            ]),
            h('p', { class: styles.quota }, `剩余 AI 生成次数：${this.quota}，配额请找赵雨森申请！`),
            h('pre', { class: styles.code }, this.resultCode),
          ]),
        ],
      );
    },
  };
};
