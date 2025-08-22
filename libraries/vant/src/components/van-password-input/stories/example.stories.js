import Component from '../index';

export default {
  id: 'van-password-input-examples',
  title: '组件列表/PasswordInput 密码输入框/示例',
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
      return {
        args,
        value: '',
        handleChange(value) {
          console.log('密码输入改变:', value);
        },
        handleComplete(value) {
          console.log('密码输入完成:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-password-input 
          v-model="value" 
          v-bind="args" 
          @change="handleChange"
          @complete="handleComplete">
        </van-password-input>
        <p style="margin-top: 10px;">当前密码: {{ value }}</p>
      </div>
    `,
  }),
  args: {
    length: 6,
    disabled: false,
    readonly: false,
    autofocus: false,
  },
};

export const CustomLength = {
  name: '自定义长度',
  render: () => ({
    setup() {
      return {
        value: '',
        handleChange(value) {
          console.log('密码输入改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-password-input 
          v-model="value" 
          :length="4"
          @change="handleChange">
        </van-password-input>
        <p style="margin-top: 10px;">当前密码: {{ value }}</p>
      </div>
    `,
  }),
};

export const ShowPassword = {
  name: '显示密码',
  render: () => ({
    setup() {
      return {
        value: '',
        handleChange(value) {
          console.log('密码输入改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-password-input 
          v-model="value" 
          :length="6"
          :show-password="true"
          @change="handleChange">
        </van-password-input>
        <p style="margin-top: 10px;">当前密码: {{ value }}</p>
      </div>
    `,
  }),
};

export const Disabled = {
  name: '禁用状态',
  render: () => ({
    setup() {
      return {
        value: '123456',
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-password-input 
          v-model="value" 
          :length="6"
          disabled>
        </van-password-input>
        <p style="margin-top: 10px;">当前密码: {{ value }}</p>
      </div>
    `,
  }),
};

export const WithError = {
  name: '错误状态',
  render: () => ({
    setup() {
      return {
        value: '',
        handleChange(value) {
          console.log('密码输入改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-password-input 
          v-model="value" 
          :length="6"
          error-info="密码格式不正确"
          @change="handleChange">
        </van-password-input>
        <p style="margin-top: 10px;">当前密码: {{ value }}</p>
      </div>
    `,
  }),
};

export const WithInfo = {
  name: '提示信息',
  render: () => ({
    setup() {
      return {
        value: '',
        handleChange(value) {
          console.log('密码输入改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-password-input 
          v-model="value" 
          :length="6"
          info="请输入6位数字密码"
          @change="handleChange">
        </van-password-input>
        <p style="margin-top: 10px;">当前密码: {{ value }}</p>
      </div>
    `,
  }),
};

export const Highlight = {
  name: '高亮状态',
  render: () => ({
    setup() {
      return {
        value: '',
        handleChange(value) {
          console.log('密码输入改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-password-input 
          v-model="value" 
          :length="6"
          :highlight="true"
          @change="handleChange">
        </van-password-input>
        <p style="margin-top: 10px;">当前密码: {{ value }}</p>
      </div>
    `,
  }),
};

export const CustomStyle = {
  name: '自定义样式',
  render: () => ({
    setup() {
      return {
        value: '',
        handleChange(value) {
          console.log('密码输入改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-password-input 
          v-model="value" 
          :length="6"
          theme="round"
          size="large"
          background-color="#f7f8fa"
          border-color="#1989fa"
          @change="handleChange">
        </van-password-input>
        <p style="margin-top: 10px;">当前密码: {{ value }}</p>
      </div>
    `,
  }),
};

export const WithMaxLength = {
  name: '最大长度限制',
  render: () => ({
    setup() {
      return {
        value: '',
        handleChange(value) {
          console.log('密码输入改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-password-input 
          v-model="value" 
          :length="6"
          :maxlength="4"
          @change="handleChange">
        </van-password-input>
        <p style="margin-top: 10px;">当前密码: {{ value }}</p>
      </div>
    `,
  }),
}; 
