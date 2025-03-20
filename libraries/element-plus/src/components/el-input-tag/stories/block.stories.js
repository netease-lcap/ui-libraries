import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'el-input-tag-blocks',
  title: '组件列表/Input Tag 标签输入框/区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Block1 = {
  name: '标签输入框',
  render: () => ({
    setup() {},
    template: `
      <el-input-tag />
    `,
  }),
};
