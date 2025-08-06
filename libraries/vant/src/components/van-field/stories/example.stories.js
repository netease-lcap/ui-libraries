import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'van-field-examples',
  title: '组件列表/Field 输入框/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '基础用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      const value = ref('');
      return {
        args,
        value,
        handleInput(value) {
          console.log('输入值:', value);
        },
        handleChange(value) {
          console.log('值改变:', value);
        },
        handleClear() {
          console.log('清空输入');
        },
        handleFocus() {
          console.log('获得焦点');
        },
        handleBlur() {
          console.log('失去焦点');
        },
        handleClick() {
          console.log('点击');
        },
      };
    },
    template: `
    <div>
    {{value}}
  <van-field
    v-model="value"
    clearable
    left-icon="music-o"
    placeholder="显示清除图标"
    colon
  >
  <template #label>
    <span>用户名</span>
  </template>
  </van-field>
    </div>
    `,
  }),
  args: {
    placeholder: '请输入内容',
    clearable: true,
    disabled: false,
    readonly: false,
    type: 'text',
    size: 'default',
  },
};

export const WithLabel = {
  name: '带标签',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        value: '',
      };
    },
    template: `
      <van-field 
        v-bind="args" 
        v-model="value"
      />
    `,
  }),
  args: {
    label: '用户名',
    placeholder: '请输入用户名',
    clearable: true,
    required: true,
  },
};

export const DifferentTypes = {
  name: '不同类型',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        textValue: '',
        passwordValue: '',
        numberValue: '',
        emailValue: '',
        telValue: '',
        textareaValue: '',
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <van-field 
          v-model="textValue"
          label="文本"
          placeholder="请输入文本"
          clearable
        />
        <van-field 
          v-model="passwordValue"
          label="密码"
          type="password"
          placeholder="请输入密码"
          clearable
        />
        <van-field 
          v-model="numberValue"
          label="数字"
          type="number"
          placeholder="请输入数字"
          clearable
        />
        <van-field 
          v-model="emailValue"
          label="邮箱"
          type="email"
          placeholder="请输入邮箱"
          clearable
        />
        <van-field 
          v-model="telValue"
          label="电话"
          type="tel"
          placeholder="请输入电话"
          clearable
        />
        <van-field 
          v-model="textareaValue"
          label="多行文本"
          type="textarea"
          placeholder="请输入多行文本"
          rows="3"
          autosize
        />
      </div>
    `,
  }),
  args: {},
};

export const WithIcons = {
  name: '带图标',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        value: '',
      };
    },
    template: `
      <van-field 
        v-bind="args" 
        v-model="value"
      />
    `,
  }),
  args: {
    label: '搜索',
    placeholder: '请输入搜索内容',
    prefixIcon: 'Search',
    suffixIcon: 'Arrow',
    clearable: true,
  },
};

export const DifferentSizes = {
  name: '不同尺寸',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        smallValue: '',
        defaultValue: '',
        largeValue: '',
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <van-field 
          v-model="smallValue"
          label="小尺寸"
          size="small"
          placeholder="小尺寸输入框"
          clearable
        />
        <van-field 
          v-model="defaultValue"
          label="默认尺寸"
          size="default"
          placeholder="默认尺寸输入框"
          clearable
        />
        <van-field 
          v-model="largeValue"
          label="大尺寸"
          size="large"
          placeholder="大尺寸输入框"
          clearable
        />
      </div>
    `,
  }),
  args: {},
};

export const WithError = {
  name: '错误状态',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        value: '',
      };
    },
    template: `
      <van-field 
        v-bind="args" 
        v-model="value"
      />
    `,
  }),
  args: {
    label: '用户名',
    placeholder: '请输入用户名',
    error: true,
    errorMessage: '用户名不能为空',
    required: true,
  },
};

export const Disabled = {
  name: '禁用状态',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        value: '禁用状态的值',
      };
    },
    template: `
      <van-field 
        v-bind="args" 
        v-model="value"
      />
    `,
  }),
  args: {
    label: '禁用状态',
    placeholder: '请输入内容',
    disabled: true,
  },
};

export const Readonly = {
  name: '只读状态',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        value: '只读状态的值',
      };
    },
    template: `
      <van-field 
        v-bind="args" 
        v-model="value"
      />
    `,
  }),
  args: {
    label: '只读状态',
    placeholder: '请输入内容',
    readonly: true,
  },
};
