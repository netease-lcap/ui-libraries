import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'el-tabs-examples',
  title: '组件列表/Tabs 标签页/示例',
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
      }, 3000);

      return {
        name,
        activeName,
        handleClick,
      };
    },
    template: `
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick" type="card">
      <el-tab-pane :label="name" name="first">User</el-tab-pane>
      <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>
    `,
  }),
};
