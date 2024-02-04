/** @type { import('@storybook/vue-vite').StorybookConfig } */
import Config from '../lcap-ui.config.js';

const config = {
  stories: [
    ...Config.components.map(c => [`../src/components/${c.name}.vue/**/*.mdx`, `../src/components/${c.name}.vue/**/*.stories.@(js|jsx|mjs|ts|tsx)`]).flat(),
    '../theme/theme.stories.js',
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-storyshots",
  ],
  framework: {
    name: "@storybook/vue-vite",
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
