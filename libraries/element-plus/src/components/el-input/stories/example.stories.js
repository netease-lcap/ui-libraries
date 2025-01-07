import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'el-input-examples',
  title: '组件列表/Input 输入框/示例',
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
      const myref = ref();
      const yref = ref();

      const handleClick = (tab) => {
        console.log(tab);
        // activeName.value = tab;
        name.value = tab;
      };
      setTimeout(() => {
        name.value = 'newName';
        activeName.value = 'second';
        console.log(myref, 'myref');
        console.log(myref.value.input.focus(), 'myref.value.ref');
        console.log('yref', yref);
      }, 3000);

      return {
        name,
        activeName,
        handleClick,
        myref,
        yref,
      };
    },
    template: `
    <div>
    <el-input ref="myref" v-model:value="activeName" @focus="handleClick"  :autofocus="true" class="demo-tabs"  type="card"> </el-input>
      {{activeName}}
      ==={{name}}
      <el-input-plus ref="yref" :model-value="name" v-model:value="activeName" @input="handleClick"></el-input-plus>
    </div>
    `,
  }),
};
