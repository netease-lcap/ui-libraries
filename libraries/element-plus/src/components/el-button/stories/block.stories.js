import Component from '../index';

export default {
  id: 'el-button-blocks',
  title: '组件列表/Button 按钮/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '按钮',
  render: () => ({
    setup() {
      return {};
    },
    template: `
    <div>
      <el-button type="primary">按钮</el-button>
    </div>
    `,
  }),
};
