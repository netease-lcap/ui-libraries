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
    const cascaderValue = ref('2');
    return {
      pickerValue,
      fieldValue,
      cascaderValue,
    };
  },
  template: `
    <van-form validate-trigger="onSubmit" ref="form" @submit="formSubmit">

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
      {{cascaderValue}}级联选择器
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

export const WithColon = Template.bind({});
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
