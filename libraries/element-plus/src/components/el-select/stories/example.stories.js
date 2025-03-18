import { ref } from 'vue';
import Component, { ElSelect, ElOption } from '../index';
// import { ElSelect, ElOption } from '../index';

export default {
  id: 'el-select-examples',
  title: '组件列表/Select 选择框/示例',
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
    <el-select v-model="activeName" multiple>
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
      const list = ref([{ value: 1, label: '1' }, { value: 2, label: '2' }, { value: 3, label: '3' }]);
      // const list = ref([1, 2, 3]);
list.value = async () => {
        return new Promise((res) => {
          setTimeout(() => {
            const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

            const value = ref();
            const options = Array.from({ length: 1000 }).map((_, idx) => ({
              value: `Option ${idx + 1}`,
              label: `${initials[idx % 10]}${idx}`,
            }));
            res(options);
            // res([{ value: 1 }, { value: 2 }, { value: 3, 'data-nodepath': 'aabb' }]);
          }, 1000);
        });
      };
      const select = ref('');

      const handleClick = (tab) => {
        console.log(tab, '====');
        select.value.reload();
      };

      setTimeout(() => {
        // name.value = 'myname';
        // list.value = [{ value: 2, label: '2' }, { value: 3, label: '3' }];

        console.log(select, 'select');
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
    <el-select ref="select" v-model="activeName"  clearable :dataSource="list" multiple >
     <el-option label="item.value" :value="item.value" :name="name" / >

    </el-select>
    {{ activeName }}
    <button @click="handleClick">click</button>
    
    </div>

    `,
  }),
};

export const Example3 = {
  name: '表单选择器',
  render: () => ({
    setup() {
      return {};
    },
    template: `
    <el-select 
      data-nodepath="08aee5f1fb524428a44a7a0ccb7861bf" 
      data-enable-events="click" 
      noDataText="没有数据"
      key="component-08aee5f1fb524428a44a7a0ccb7861bf" 
      valueField="value" 
      textField="text"  
      multiple

       >
        <el-option 
          data-nodepath="cbb75d5e07ee485bba33d8ed521a52d2" 
          value="1" 
          label="选项1" 
          key="component-cbb75d5e07ee485bba33d8ed521a52d2">
          <el-text text="选项1" />
        </el-option>
        <el-option data-nodepath="ba7693282f4f45338fc3dbe5536252aa" value="2" label="选项2" key="component-ba7693282f4f45338fc3dbe5536252aa"  >
            <el-text text="选项2" />
        </el-option>
        <el-option data-nodepath="10e06bfd817c47d7a5b642c689a560eb" value="3" label="选项3" key="component-10e06bfd817c47d7a5b642c689a560eb"  >
            <el-text text="选项3" />
        </el-option>
    </el-select>
    `,
  }),
};
