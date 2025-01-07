import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'el-select-examples',
  title: '组件列表/select 选择框/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  基础的、简洁的标签页。 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    setup() {
      const activeName = ref('first');
      const name = ref('myName');

      const handleClick = (tab) => {
        console.log(tab);
      };
      setTimeout(() => {
        name.value = 'newName';
        activeName.value = 'second';
      }, 3000);

      return {
        name,
        activeName,
        handleClick,
      };
    },
    template: `
    <el-select v-model="activeName">
      <el-option
        key="item.value"
        label="item.label"
        value="item.value"
      />
    </el-select>

    `,
  }),
};
