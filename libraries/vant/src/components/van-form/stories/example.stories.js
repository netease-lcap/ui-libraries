export default {
  title: 'VanForm/表单',
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
  template: `
    <van-form v-bind="$props" @submit="onSubmit" @failed="onFailed">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="请输入用户名"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
      />
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  `,
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit(values) {
      console.log('表单提交:', values);
    },
    onFailed(errorFields, values) {
      console.log('表单校验失败:', errorFields, values);
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