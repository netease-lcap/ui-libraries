import { type Preview, setup } from '@storybook/vue3';
import ElementPlus from '../src/index';

setup((app) => {
  app.use(ElementPlus);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
