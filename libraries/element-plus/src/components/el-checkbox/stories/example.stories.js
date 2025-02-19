import { ref } from 'vue';
import Component from '../index';
// import { ElSelect, ElOption } from '../index';

export default {
  id: 'el-checkbox-examples',
  title: '组件列表/checkbox 选择框/示例',
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
      const activeName = ref([]);
      const name = ref('myName');
      // const list = ref([{ value: 1 }, { value: 2 }, { value: 3 }]);
      // const list = ref([1, 2, 3]);
      const list = async () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([
              { value: 1, label: 1 },
              { value: 2, label: 2 },
              { value: 3, label: 3, 'data-nodepath': 'aabb' },
            ]);
          }, 3000);
        });
      };
      const dataSourceProps = ref({ dataSource: [] });
      const dataSource = () => new Promise((res) => {
        setTimeout(() => {
          res([
            {
              entity1: {
                id: '0',
                createdTime: null,
                updatedTime: null,
                createdBy: null,
                updatedBy: null,
                property1: '选项5',
                fid: '1',
              },
            },
            {
              entity1: {
                id: '1',
                createdTime: null,
                updatedTime: null,
                createdBy: null,
                updatedBy: null,
                property1: '选项6',
                fid: '2',
              },
            },
            {
              entity1: {
                id: '3',
                createdTime: null,
                updatedTime: null,
                createdBy: null,
                updatedBy: null,
                property1: '选项3',
                fid: '0',
              },
            },
            {
              entity1: {
                id: '7',
                createdTime: null,
                updatedTime: null,
                createdBy: null,
                updatedBy: null,
                property1: '选项2',
                fid: '1',
              },
            },
            {
              entity1: {
                id: '8',
                createdTime: null,
                updatedTime: null,
                createdBy: null,
                updatedBy: null,
                property1: '选项1.1',
                fid: '2',
              },
            },
            {
              entity1: {
                id: '9',
                createdTime: null,
                updatedTime: null,
                createdBy: null,
                updatedBy: null,
                property1: '选项4',
                fid: '0',
              },
            },
          ]);
        }, 3000);
      });
      const select = ref('');
      const options = ref([
        {
          label: 1,
          value: 1,
        },
        {
          label: 2,
          value: 2,
        },
        {
          label: 3,
          value: 3,
        },
      ]);
      const arr = [3, 4, 5];

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
        // dataSourceProps.value = { dataSource: [{}, {}, {}, {}] };
        dataSourceProps.value.dataSource = [{}, {}, {}, {}];
        console.log('=====');
        // list.value.push({ value: 4 });
      }, 3000);

      return {
        name,
        select,
        activeName,
        options,
        list,
        dataSource,
        dataSourceProps,
        arr,
        handleClick,
      };
    },
    template: `
    <div>
      <el-checkbox-group v-bind="dataSourceProps">
        <el-checkbox label="Option1" value="Value1" />
        <el-checkbox label="Option2" value="Value2" />
        <template #item=" item ">
          <el-text text="item.entity1.property1"  @click="handleClick(item)"/>
        </template>
      </el-checkbox-group>
    </div>

    `,
  }),
};
