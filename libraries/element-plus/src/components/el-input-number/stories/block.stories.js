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
    setup() {
      const num = ref(1);
      return { num };
    },
    template: `
    <div>
      <el-input-number v-model="num" :min="1" :max="10" />
    </div>
    `,
  }),
}; 