import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'el-time-select-examples',
  title: '组件列表/time-select 时间选择/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Example1 = {
  name: '基础用法',
  render: () => ({
    setup() {
      const time = ref('09:30');

      const handleClick = (tab) => {
        console.log(tab);
      };
      setTimeout(() => {
        time.value = '10:00';
      }, 3000);

      return {
        time,
        handleClick,
      };
    },
    template: `
    <el-time-select v-model="time"  start="09:00" end="12:00"></el-time-select>

    `,
  }),
};
