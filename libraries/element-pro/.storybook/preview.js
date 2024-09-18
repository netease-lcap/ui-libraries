import Vue from 'vue';
import * as ElementUI from '@/main';
import { Button } from '@element-pro';
import './reset.css';


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

Vue.component('el-button', {
  props: {
    text: String,
  },
  render(h) {
    return h(Button, {
      attrs: this.$attrs,
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
