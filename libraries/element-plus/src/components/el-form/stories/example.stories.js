import { ref, watch } from 'vue';
import Component from '../index';
// import { ElSelect, ElOption } from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';

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
      const model = ref({});

      return {
        name,
        activeName,
        list,
        handleClick,
        model,
      };
    },
    template: `
    <div>
    {{model}}
    <el-form :model="model">
      <el-form-input  label="input21" :rules="[{validate: 'filled',message: '表单项不得为空',trigger: 'input+blur',required: true}]"  />
    </el-form>
    </div>

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
            // res([{ value: 1 }, { value: 2 }, { value: 3, 'data-nodepath': 'aabb' }]);
            res([
              { value: 1, label: 1 },
              { value: 2, label: 2 },
              { value: 3, label: 3, 'data-nodepath': 'aabb' },
            ]);
          }, 1000);
        });
      };
      const select = ref();
      const log = (el) => {
        console.log(el);
        formData.value.input = el;
        inputName.value = el;
        console.log(formData.value, 'formData');
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
          trigger: 'blur',
          required: true,
        },
      ];
      const inputTag = ref([]);
      const switchValue = ref(false);
      const model = ref({
        input21: '123',
      });
      const handleClick = async (tab) => {
        // console.log('====', formData, tab);
        tab.resetForm();
        // console.log(tab, 'tab', tab.validated());
        // console.log(model, 'model');
      };
      watch(
        model,
        (value) => {
          console.log(value, 'model');
        },
        {
          immediate: true,
          deep: true,
        },
      );
      return {
        model,
        formData,
        switchValue,
        select,
        activeName,
        inputName,
        inputTag,
        list,
        handleClick,
        log,
        formRef,
        rules,
      };
    },
    template: `
    <div>
    <el-form :model="model" ref="formRef" :inline="true">
    {{inputName}}
    <el-form-input :rules="rules"  prop="input21" label="input21"  data-nodepath="input21" />
    <el-form-mention :rules="rules"  v-model="inputName"  label="input21"  data-nodepath="input21" />
    <el-form-select :rules="rules" clearable  v-model="inputName"  label="input21"  data-nodepath="input21" :dataSource="[{label:'待审批',value:0},{label:'已审批',value:1},{label:'已拒绝',value:2}]" />
    <el-form-select :rules="rules" clearable  v-model="inputName"  label="input21"  data-nodepath="input21" :dataSource="[{label:'待审批',value:0},{label:'已审批',value:1},{label:'已拒绝',value:2}]" />
    <el-form-select :rules="rules" clearable  v-model="inputName"  label="input21"  data-nodepath="input21" :dataSource="[{label:'待审批',value:0},{label:'已审批',value:1},{label:'已拒绝',value:2}]" />
    <el-form-select :rules="rules" clearable  v-model="inputName"  label="input21"  data-nodepath="input21" :dataSource="[{label:'待审批',value:0},{label:'已审批',value:1},{label:'已拒绝',value:2}]" />
    <el-form-select :rules="rules" clearable  v-model="inputName"  label="input21"  data-nodepath="input21" :dataSource="[{label:'待审批',value:0},{label:'已审批',value:1},{label:'已拒绝',value:2}]" />
    <el-button @click="handleClick(formRef)" >Submit</el-button>

    <a @click="handleClick(formRef)" >Submit</a>
    <a @click="handleClick(formRef)" >Submit2</a>
    </el-form>

    <el-form :model="model" ref="formRef" >
    {{inputName}}
    <el-form-input :rules="rules"  prop="input21" label="input21"  data-nodepath="input21" />
    <el-form-mention :rules="rules"  v-model="inputName"  label="input21"  data-nodepath="input21" />
    <el-form-select :rules="rules" clearable  v-model="inputName"  label="input21"  data-nodepath="input21" :dataSource="[{label:'待审批',value:0},{label:'已审批',value:1},{label:'已拒绝',value:2}]" />
    <el-button @click="handleClick(formRef)" >Submit</el-button>

    <a @click="handleClick(formRef)" >Submit</a>
    <a @click="handleClick(formRef)" >Submit2</a>
    </el-form>

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
        const result = await formRef.resetForm();
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

export const Example4 = {
  name: '表单预览',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo />',
  }),
};

export const Example5 = {
  name: 'label竖着排列对齐',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        Example4,
        args,
      };
    },
    template: `
    <div>
      <el-form v-bind="args"   >
        <el-flex class="el-flex-form-item">
          <el-form-input label="aaaaaaaaaaaaa" class="my-label" />
          <el-form-input class="my-label" />
        </el-flex>
      </el-form>
    </div>
    `,
  }),
  args: {
    labelPosition: 'top',
  },
};

export const Example6 = {
  name: 'button对齐',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        Example4,
        args,
      };
    },
    template: `
    <div>
      <el-form v-bind="args"   >
        <el-flex class="el-flex-form-item">
          <el-form-input label="aaaaaaaa" class="my-label" />
        </el-flex>
        <el-flex class="el-flex-form-item">
            <el-button>Submit</el-button>
        </el-flex>
      </el-form>
    </div>
    `,
  }),
  args: {
    labelPosition: 'left',
    labelWidth: '100px',
  },
};

export const Example7 = {
  name: '表单inline',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        Example4,
        args,
      };
    },
    template: `
    <div>
      <el-form v-bind="args"   >
        <el-flex class="el-flex-form-item">
          <el-form-input label="aaaaaaaa" class="my-label" />
        </el-flex>
        <el-flex class="el-flex-form-item">
          <el-form-input label="aaaaaaaa" class="my-label" />
        </el-flex>
      </el-form>
    </div>
    `,
  }),
  args: {
    inline: true,
  },
};
