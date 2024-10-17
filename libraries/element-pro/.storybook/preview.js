import Vue from 'vue';
import * as ElementUI from '@/main';
import { Button } from '@element-pro';
import '../src/styles/preview.css';


Vue.use(ElementUI);

Vue.component('el-text', {
  name: 'ElText',
  props: {
    text: String,
  },
  render(h) {
    return h('span', this.text);
  },
});

Vue.component('el-icon', {
  name: 'ElIcon',
  props: {
    name: String,
  },
  render(h) {
    return h('i', {
      class: `el-icon-${this.name} el-p-icon`,
      on: this.$listeners,
    });
  }
});

Vue.component('el-button', {
  props: {
    text: String,
    icon: String,
  },
  render(h) {
    return h(Button, {
      attrs: this.$attrs,
      props: {
        icon: this.icon ? h('el-icon', { attrs: { name: this.icon } }) : null,
      },
      on: this.$listeners,
    }, this.text || this.$slots.default);
  }
});

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [() => ({
    provide() {
      return {
        'VUE_APP_DESIGNER': false
      }
    },
    template: '<story/>',
  })],
};

export default preview;
