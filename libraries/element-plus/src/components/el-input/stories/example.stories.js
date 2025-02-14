import { ref, watch } from 'vue';
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
        console.log(tab, 'tabe====');

        // activeName.value = 'second';
        // activeName.value = tab;
      };
      setTimeout(() => {
        // name.value = 'newName';
        // activeName.value = 'second';
        // console.log(myref, 'myref');
        console.log('yref', yref);
        // console.log(yref.value.focus(), 'myref.value.ref');
      }, 2000);

      setTimeout(() => {
        // console.log(myref.value.myChange(), 'myref.value.ref');
        console.log('activeName', yref);
      }, 9000);

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
      {{activeName}}
      <el-input ref="yref" type="text"    v-model="activeName" clearable  @click="handleClick" ></el-input>
    </div>
    `,
  }),
};
