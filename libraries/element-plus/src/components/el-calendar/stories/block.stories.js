import Component from '../index';

export default {
  id: 'el-calendar-blocks',
  title: '组件列表/Calendar 日历/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '日历',
  render: () => ({
    setup() {
      return {};
    },
    template: `
    <div>
      <el-calendar />
    </div>
    `,
  }),
}; 