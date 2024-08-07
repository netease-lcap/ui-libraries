/** @type { import('@storybook/vue-vite').StorybookConfig } */
import Config from '../lcap-ui.config.js';

const config = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*.mdx',
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-viewport",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@lcap/storybook-vue-vite",
    options: {
      builder: {
        viteConfigPath: './vite.config.js',
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
