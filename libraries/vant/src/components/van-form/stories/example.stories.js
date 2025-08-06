import { ref } from 'vue';

export default {
  id: 'van-form-example',
  title: '组件列表/Form 表单/示例',
  component: () => import('../index.ts'),
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: '是否禁用整个表单',
    },
    readonly: {
      control: { type: 'boolean' },
      description: '是否为只读状态',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'top'],
      description: '表单项标签的位置',
    },
    labelAlign: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: '表单项标签对齐方式',
    },
    colon: {
      control: { type: 'boolean' },
      description: '是否在 label 后面添加冒号',
    },
  },
};

const Template = (args) => ({
  props: Object.keys(args),
  setup() {
    const pickerValue = ref([]);
    const fieldValue = ref('');
    const cascaderValue = ref('');
    const radioValue = ref('');
    const checkboxValue = ref([]);
    return {
      pickerValue,
      fieldValue,
      cascaderValue,
      radioValue,
      checkboxValue,
    };
  },
  template: `
    <van-form validate-trigger="onSubmit" ref="form" @submit="formSubmit">
      {{fieldValue}}输入框
      <van-form-field
             :rules="[{validate: 'filled',message: '表单项不得为空',trigger: 'input+blur',required: true}]"
      required name="username" placeholder="请输入用户名" v-model="fieldValue">
        <template #label>
          <span>用户名</span>
        </template>
      </van-form-field>
      {{pickerValue}}选择器
      <van-form-picker
             :rules="[{validate: 'filled',message: '表单项不得为空',trigger: 'input+blur',required: true}]"
             v-model="pickerValue"
      required name="gender" placeholder="请选择性别"
        :dataSource="[{ text: '男', value: '1' }, { text: '女', value: '2' }]"
        clearable
      >
      </van-form-picker>
      {{cascaderValue}}级联选择器
      <van-form-cascader
        :rules="[{validate: 'filled',message: '表单项不得为空',trigger: 'input+blur',required: true}]"
        v-model="cascaderValue"
        required name="cascader" placeholder="请选择级联选择器"
        :dataSource="[{ text: '男', value: '1' }, { text: '女', value: '2' }]"
        clearable
      >
        <template #label>
          <span>级联选择器</span>
        </template>
      </van-form-cascader>
      <van-form-radio-group
        :rules="[{validate: 'filled',message: '表单项不得为空',trigger: 'input+blur',required: true}]"
        v-model="radioValue"
        required name="radio" placeholder="请选择性别"
        :dataSource="[{ text: '男', value: '1' }, { text: '女', value: '2' }]"
        clearable
      >
        <template #label>
          <span>单选框</span>
        </template>
      </van-form-radio-group>
      <van-form-checkbox-group
        :rules="[{validate: 'filled',message: '表单项不得为空',trigger: 'input+blur',required: true}]"
        required name="checkbox" placeholder="请选择性别"
        :dataSource="[{ text: '男', value: '1' }, { text: '女', value: '2' }]"
        clearable
      >
        <template #label>
          <span>多选框</span>
        </template>
      </van-form-checkbox-group>
      <van-form-rate
        :rules="[{validate: 'filled',message: '表单项不得为空',trigger: 'input+blur',required: true}]"
        required name="rate" placeholder="请选择评分"
      >
        <template #label>
          <span>评分</span>
        </template>
      </van-form-rate>
      <van-form-switch
        :rules="[{validate: 'filled',message: '表单项不得为空',trigger: 'input+blur',required: true}]"
        required name="switch" placeholder="请选择开关"
      >
        <template #label>
          <span>开关</span>
        </template>
      </van-form-switch>
      <van-form-slider
        :rules="[{validate: 'filled',message: '表单项不得为空',trigger: 'input+blur',required: true}]"
        required name="slider" placeholder="请选择评分"
      >
        <template #label>
          <span>滑块</span>
        </template>
      </van-form-slider>
      <van-form-search>
        <template #label>
          <span>搜索</span>
        </template>
      </van-form-search>
      <van-flex>
        <van-button type="primary" @click="onSubmit">提交</van-button>
        <van-button type="primary" @click="onReset">重构</van-button>
      </van-flex>
    </van-form>
  `,
  data() {
    return {
      username: '',
      password: '',
      checked: '1',
    };
  },
  methods: {
    onSubmit(values) {
      console.log(this.$refs.form.validated(), 'form');
    },
    formSubmit(value) {
      console.log(value, '====');
    },
    onFailed(errorFields, values) {
      console.log('表单校验失败:', errorFields, values);
    },
    onReset() {
      console.log(this.$refs.form.resetForm(), 'form');
    },
  },
});

export const Default = Template.bind({});
Default.args = {
  labelPosition: 'left',
  labelAlign: 'left',
  colon: false,
  disabled: false,
  readonly: false,
};

export const WithColon = () => ({
  setup() {},
  template: `
  <van-form>
    <van-form-picker :label-width="100" data-nodepath="12">
      <template #label>
        <span>用户名</span>
      </template>
    </van-form-picker>
    <van-form>
  `,
});
WithColon.args = {
  ...Default.args,
  colon: true,
};

export const TopLabel = Template.bind({});
TopLabel.args = {
  ...Default.args,
  labelPosition: 'top',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const Readonly = Template.bind({});
Readonly.args = {
  ...Default.args,
  readonly: true,
};
