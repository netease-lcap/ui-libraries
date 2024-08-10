import Vue from 'vue';
import * as ElementUI from '@/main';

Vue.use(ElementUI);

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
