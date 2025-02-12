import { ref } from 'vue';
import Component, { ElSelect, ElOption } from '../index';
// import { ElSelect, ElOption } from '../index';

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
      const list = [1, 2, 3];

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
        list,
        handleClick,
      };
    },
    template: `
    <el-select v-model="activeName">
      <el-option
        v-for="item in list"
        key="item.value"
        label="item.label"
        value="item.value"
      />
    </el-select>

    `,
  }),
};

export const Example2 = {
  name: '异步函数',
  render: () => ({
    setup() {
      const activeName = ref('first');
      const name = ref('myName');
      // const list = ref([{ value: 1 }, { value: 2 }, { value: 3 }]);
      // const list = ref([1, 2, 3]);
      const list = async () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([{ value: 1 }, { value: 2 }, { value: 3, 'data-nodepath': 'aabb' }]);
          }, 3000);
        });
      };
      const select = ref('');

      const handleClick = (tab) => {
        console.log(tab);
      };
      // setTimeout(() => {
      // name.value = 'newName';
      // list.value[0].value = 2;
      // activeName.value = 'second';
      // list;
      // }, 3000);
      setTimeout(() => {
        name.value = 'myname';
        // list.value.push({ value: 4 });
      }, 3000);

      return {
        name,
        select,
        activeName,
        list,
        handleClick,
      };
    },
    template: `
    <div>
    <el-select ref="select"  :dataSource="list"  >
     <el-option label="item.value" value="item.value" :name="name" / >

    </el-select>
    {{ activeName }}
    
    </div>

    `,
  }),
};
