import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'van-switch-examples',
  title: '组件列表/Switch 开关/示例',
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
        value: ref(false),
        handleChange(value) {
          console.log('开关值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-switch v-model="value" v-bind="args" @change="handleChange"></van-switch>
        <p style="margin-top: 10px;">当前状态: {{ value ? '开启' : '关闭' }}</p>
      </div>
    `,
  }),
  args: {
    disabled: false,
    loading: false,
    size: 'default',
  },
};

export const Disabled = {
  name: '禁用状态',
  render: () => ({
    setup() {
      return {
        value: true,
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-switch v-model="value" disabled></van-switch>
        <p style="margin-top: 10px;">当前状态: {{ value ? '开启' : '关闭' }}</p>
      </div>
    `,
  }),
};

export const Loading = {
  name: '加载状态',
  render: () => ({
    setup() {
      return {
        value: true,
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-switch v-model="value" loading></van-switch>
        <p style="margin-top: 10px;">当前状态: {{ value ? '开启' : '关闭' }}</p>
      </div>
    `,
  }),
};

export const CustomSize = {
  name: '自定义尺寸',
  render: () => ({
    setup() {
      return {
        value: false,
        handleChange(value) {
          console.log('开关值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-switch v-model="value" size="large" @change="handleChange"></van-switch>
        <p style="margin-top: 10px;">当前状态: {{ value ? '开启' : '关闭' }}</p>
      </div>
    `,
  }),
};

export const CustomColor = {
  name: '自定义颜色',
  render: () => ({
    setup() {
      return {
        value: true,
        handleChange(value) {
          console.log('开关值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-switch 
          v-model="value" 
          active-color="#07c160" 
          inactive-color="#dcdee0"
          @change="handleChange">
        </van-switch>
        <p style="margin-top: 10px;">当前状态: {{ value ? '开启' : '关闭' }}</p>
      </div>
    `,
  }),
};

export const CustomValue = {
  name: '自定义值',
  render: () => ({
    setup() {
      return {
        value: 'on',
        handleChange(value) {
          console.log('开关值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-switch 
          v-model="value" 
          active-value="on" 
          inactive-value="off"
          @change="handleChange">
        </van-switch>
        <p style="margin-top: 10px;">当前值: {{ value }}</p>
      </div>
    `,
  }),
};

export const WithText = {
  name: '带文字',
  render: () => ({
    setup() {
      return {
        value: true,
        handleChange(value) {
          console.log('开关值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-switch 
          v-model="value" 
          active-text="开启" 
          inactive-text="关闭"
          @change="handleChange">
        </van-switch>
        <p style="margin-top: 10px;">当前状态: {{ value ? '开启' : '关闭' }}</p>
      </div>
    `,
  }),
};

export const WithIcon = {
  name: '带图标',
  render: () => ({
    setup() {
      return {
        value: true,
        handleChange(value) {
          console.log('开关值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-switch 
          v-model="value" 
          active-icon="check" 
          inactive-icon="close"
          @change="handleChange">
        </van-switch>
        <p style="margin-top: 10px;">当前状态: {{ value ? '开启' : '关闭' }}</p>
      </div>
    `,
  }),
};

export const SquareShape = {
  name: '方形开关',
  render: () => ({
    setup() {
      return {
        value: false,
        handleChange(value) {
          console.log('开关值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-switch 
          v-model="value" 
          shape="square"
          @change="handleChange">
        </van-switch>
        <p style="margin-top: 10px;">当前状态: {{ value ? '开启' : '关闭' }}</p>
      </div>
    `,
  }),
};
