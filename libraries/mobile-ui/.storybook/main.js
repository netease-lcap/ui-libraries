/** @type { import('@storybook/vue-vite').StorybookConfig } */
import Config from '../lcap-ui.config.js';

const config = {
  stories: [
    ...Config.components.map(c => [`../src/${c.name}/**/*.mdx`, `../src/${c.name}/**/*.stories.@(js|jsx|mjs|ts|tsx)`, `../src-vusion/components/${c.name}/**/*.mdx`, `../src-vusion/components/${c.name}/**/*.stories.@(js|jsx|mjs|ts|tsx)`]).flat(),
    '../**/theme.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-viewport",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-storyshots",
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
