import Component from '../index';

export default {
  id: 'el-card-blocks',
  title: '组件列表/Card 卡片/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '卡片',
  render: () => ({
    setup() {
      return {};
    },
    template: `
    <div>
      <el-card style="width: 300px">卡片内容</el-card>
    </div>
    `,
  }),
}; 