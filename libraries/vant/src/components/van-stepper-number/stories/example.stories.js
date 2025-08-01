import Component from '../index';

export default {
  id: 'van-stepper-examples',
  title: '组件列表/Stepper 步进器/示例',
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
        value: 1,
        handleChange(value) {
          console.log('步进器值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-stepper v-model="value" v-bind="args" @change="handleChange"></van-stepper>
        <p style="margin-top: 10px;">当前值: {{ value }}</p>
      </div>
    `,
  }),
  args: {
    min: 1,
    max: 10,
    step: 1,
    disabled: false,
  },
};

export const MinMax = {
  name: '限制范围',
  render: () => ({
    setup() {
      return {
        value: 5,
        handleChange(value) {
          console.log('步进器值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-stepper v-model="value" :min="1" :max="10" @change="handleChange"></van-stepper>
        <p style="margin-top: 10px;">当前值: {{ value }}</p>
      </div>
    `,
  }),
};

export const Step = {
  name: '设置步长',
  render: () => ({
    setup() {
      return {
        value: 2,
        handleChange(value) {
          console.log('步进器值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-stepper v-model="value" :step="2" @change="handleChange"></van-stepper>
        <p style="margin-top: 10px;">当前值: {{ value }}</p>
      </div>
    `,
  }),
};

export const Disabled = {
  name: '禁用状态',
  render: () => ({
    setup() {
      return {
        value: 1,
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-stepper v-model="value" disabled></van-stepper>
        <p style="margin-top: 10px;">当前值: {{ value }}</p>
      </div>
    `,
  }),
};

export const DisableInput = {
  name: '禁用输入框',
  render: () => ({
    setup() {
      return {
        value: 1,
        handleChange(value) {
          console.log('步进器值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-stepper v-model="value" :disable-input="true" @change="handleChange"></van-stepper>
        <p style="margin-top: 10px;">当前值: {{ value }}</p>
      </div>
    `,
  }),
};

export const CustomSize = {
  name: '自定义尺寸',
  render: () => ({
    setup() {
      return {
        value: 1,
        handleChange(value) {
          console.log('步进器值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-stepper v-model="value" :button-size="32" :input-width="60" @change="handleChange"></van-stepper>
        <p style="margin-top: 10px;">当前值: {{ value }}</p>
      </div>
    `,
  }),
};

export const RoundTheme = {
  name: '圆角风格',
  render: () => ({
    setup() {
      return {
        value: 1,
        handleChange(value) {
          console.log('步进器值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-stepper v-model="value" theme="round" @change="handleChange"></van-stepper>
        <p style="margin-top: 10px;">当前值: {{ value }}</p>
      </div>
    `,
  }),
};

export const AsyncChange = {
  name: '异步变更',
  render: () => ({
    setup() {
      return {
        value: 1,
        handleChange(value) {
          console.log('步进器值改变:', value);
          // 模拟异步操作
          setTimeout(() => {
            this.value = value;
          }, 1000);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-stepper v-model="value" :async-change="true" @change="handleChange"></van-stepper>
        <p style="margin-top: 10px;">当前值: {{ value }}</p>
      </div>
    `,
  }),
};
