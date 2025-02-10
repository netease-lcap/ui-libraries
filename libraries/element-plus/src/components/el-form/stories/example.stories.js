import { ref } from 'vue';
import Component from '../index';
// import { ElSelect, ElOption } from '../index';

export default {
  id: 'el-form-examples',
  title: '组件列表/form 表单/示例',
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
    <el-form>
        <el-form-item   :rules="[
        {
          required: true,
          message: 'Please input email address',
          trigger: 'blur',
        },
      ]">

    <el-select v-model="activeName">
      <el-option
        v-for="item in list"
        key="item.value"
        label="item.label"
        value="item.value"
      />
    </el-select>
    </el-form-item>
    </el-form>

    `,
  }),
};

export const Example2 = {
  name: '异步函数',
  render: () => ({
    setup() {
      const activeName = ref();
      const inputName = ref('2');
      const formData = ref({ input: '', select: '' });
      const formRef = ref();
      // const list = ref([{ value: 1 }, { value: 2 }, { value: 3 }]);
      // const list = ref([1, 2, 3]);
      const list = async () => {
        return new Promise((res) => {
          setTimeout(() => {
            res([{ value: 1 }, { value: 2 }, { value: 3, 'data-nodepath': 'aabb' }]);
          }, 3000);
        });
      };
      const select = ref();
      const log = (el) => {
        console.log(el);
        formData.value.input = el;
        inputName.value = el;
        console.log(formData.value, 'formData');
      };
      const handleClick = (tab) => {
        console.log('====', formData, tab);

        // tab.fields()
        console.log(tab.fields, 'fields');
        // console.log(tab);
      };
      // setTimeout(() => {
      // name.value = 'newName';
      // list.value[0].value = 2;
      // activeName.value = 'second';
      // list;
      // }, 3000);

      return {
        formData,
        select,
        activeName,
        inputName,
        list,
        handleClick,
        log,
        formRef,
      };
    },
    template: `
    <el-form  ref="formRef">
      <el-form-item prop="input" label="input" :rules="[
        {
          required: true,
          message: 'Please input email address',
          trigger: 'change',
        },
      ]" >
        <el-input v-model:value="inputName" @input="log" />
      </el-form-item>

    <a @click="handleClick(formRef)" >Submit</a>
    
    </el-form>

    `,
  }),
};
