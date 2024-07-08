import Config from '../lcap-ui.config.js';

const config = {
  stories: [
    ...Config.components.map(c => [`../src/components/${c.name}.vue/**/*.mdx`, `../src/components/${c.name}.vue/**/*.stories.@(js|jsx|mjs|ts|tsx)`]).flat(),
    '../src/theme/theme.stories.js',
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions"
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
