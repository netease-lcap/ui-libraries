import Component from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: '组件列表/List Component 组件列表/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: `<el-list-components>
      <template #default="current"></template>
    </el-list-components>`,
  }),
};
