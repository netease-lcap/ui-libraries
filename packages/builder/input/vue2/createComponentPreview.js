import { ComponentWrap } from 'virtual:lcap-theme-preview-wrap.js';
import styles from './index.module.css';

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
      window.addEventListener('message', this.handleMessage);
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
      return h(
        'div',
        {
          class: styles.componentPreview,
        },
        this.visibleStories.map((c) => h(ComponentWrap, {
          key: c.name,
          props: {
            name: c.name,
            demo: c.demo,
            title: c.title,
            actived: c.name === this.activeName,
          },
          on: {
            click: () => this.handleClick(c.name),
          },
        })),
      );
    },
  };
};
