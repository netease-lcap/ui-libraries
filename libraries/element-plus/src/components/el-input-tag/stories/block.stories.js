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
    setup() {
      const input = ref(['标签1', '标签2']);
      return { input };
    },
    template: `
    <div>
      <el-input-tag v-model="input" placeholder="请输入内容后按回车键" />
    </div>
    `,
  }),
};
