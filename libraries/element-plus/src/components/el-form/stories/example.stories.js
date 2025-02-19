import { ref } from 'vue';
import Component from '../index';
// import { ElSelect, ElOption } from '../index';

export default {
  id: 'el-form-examples',
  title: '组件列表/Form 表单/示例',
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
      // setTimeout(() => {
      //   name.value = 'newName';
      //   activeName.value = 'second';
      // }, 3000);

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
      const handleClick = async (tab) => {
        // console.log('====', formData, tab);

        tab.validate().then(
          (res) => {
            console.log(res, 'res');
          },
          (err) => {
            console.log(err, 'err');
          },
        );

        // tab.resetForm();
        // const result= await tab.validate();
        // tab.fields()
        // console.log(tab.fields, 'fields');
        // console.log(tab);
      };
      // setTimeout(() => {
      // name.value = 'newName';
      // list.value[0].value = 2;
      // activeName.value = 'second';
      // list;
      // }, 3000);
      const rules = [
        {
          validate: 'filled',
          message: '表单项不得为空',
          trigger: 'input+blur',
          required: true,
        },
      ];
      return {
        formData,
        select,
        activeName,
        inputName,
        list,
        handleClick,
        log,
        formRef,
        rules,
      };
    },
    template: `
    <div>
    <el-form  ref="formRef">
      <el-form-input :rules="rules" label="input1" data-nodepath="input1" v-model="inputName" />
      
      <el-form-select label="select1"    v-model:value="activeName" :dataSource="list"  >
         <el-option label="item.value" value="item.value" :name="name" />
      </el-form-select>

    <el-input  v-model="inputName" data-nodepath="input21" />

    <a @click="handleClick(formRef)" >Submit</a>
    </el-form>

    <el-select v-model="activeName" data-nodepath="select1" :dataSource="list" > </el-select>
    <el-cascader v-model="activeName" data-nodepath="cascader1" :dataSource="list" />
    <el-checkbox-group v-model="activeName" data-nodepath="checkbox1" :dataSource="list" />
    </div>

    `,
  }),
};

export const Example3 = {
  name: '表单尺寸',
  render: () => ({
    setup() {
      const inputName = ref('123');
      const formRef = ref();
      const rules = [
        {
          validate: 'filled',
          message: '表单项不得为空',
          trigger: 'input+blur',
          required: true,
        },
      ];
      const handleClick = async (formRef) => {
        console.log(formRef, 'formRef');
        // formRef.validate().then((res) => {
        //   console.log(res, 'res');
        // });
        const result = await formRef.validate();
        console.log(result, 'result');
        // formRef.value.validate().then((res) => {
        //   console.log(res, 'res');
        // });
      };
      return {
        inputName,
        rules,
        formRef,
        handleClick,
      };
    },
    template: `<el-form size="small" ref="formRef" >
      <a @click="handleClick(formRef)">Submit</a> 
      <el-input label="input2" data-nodepath="input2" v-model="inputName" :rules="rules" />
    </el-form>
    `,
  }),
};
