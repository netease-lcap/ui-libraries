import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'el-input-number-blocks',
  title: '组件列表/Input Number 数字输入框/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '数字输入框',
  render: () => ({
    setup() {},
    template: `
    <el-input-number />
    `,
  }),
};
