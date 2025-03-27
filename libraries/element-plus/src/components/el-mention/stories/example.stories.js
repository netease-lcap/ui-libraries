import Component from '../index';

export default {
  id: 'el-mention-examples',
  title: '组件列表/Mention 提及/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Default = {
  name: '默认',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    data() {
      return {
        text: '',
        suggestions: ['user1', 'user2', 'user3'],
      };
    },
    template: `
      <div style="width: 300px;">
        <el-mention
          :suggestions="suggestions"
        />
      </div>
    `,
  }),
  args: {
    trigger: '@',
  },
};
