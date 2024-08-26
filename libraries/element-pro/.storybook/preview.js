import Vue from 'vue';
import * as ElementUI from '@/main';
import { Button } from '@element-pro';


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

Vue.component('el-button', Button);

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
