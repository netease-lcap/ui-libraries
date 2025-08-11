import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'van-slider-examples',
  title: '组件列表/Slider 滑块/示例',
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
      const value = ref([0, 100]);
      return {
        args,
        value,
        handleChange(value) {
          console.log('滑块值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
      {{value}}
        <van-slider range buttonColor="#1989fa" v-model="value" v-bind="args" @change="handleChange"></van-slider>
        <p style="margin-top: 10px;">当前值: {{ value }}</p>
      </div>
    `,
  }),
  args: {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  },
};

export const MinMax = {
  name: '指定范围',
  render: () => ({
    setup() {
      return {
        value: 20,
        handleChange(value) {
          console.log('滑块值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-slider v-model="value" :min="10" :max="50" @change="handleChange"></van-slider>
        <p style="margin-top: 10px;">范围: 10-50，当前值: {{ value }}</p>
      </div>
    `,
  }),
};

export const Step = {
  name: '设置步长',
  render: () => ({
    setup() {
      return {
        value: 50,
        handleChange(value) {
          console.log('滑块值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-slider v-model="value" :step="10" @change="handleChange"></van-slider>
        <p style="margin-top: 10px;">步长: 10，当前值: {{ value }}</p>
      </div>
    `,
  }),
};

export const Disabled = {
  name: '禁用状态',
  render: () => ({
    setup() {
      return {
        value: 50,
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-slider v-model="value" disabled></van-slider>
        <p style="margin-top: 10px;">禁用状态，值: {{ value }}</p>
      </div>
    `,
  }),
};

export const Vertical = {
  name: '垂直方向',
  render: () => ({
    setup() {
      return {
        value: 50,
        handleChange(value) {
          console.log('滑块值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px; display: flex; align-items: center; gap: 20px;">
        <van-slider v-model="value" vertical height="200px" @change="handleChange"></van-slider>
        <p>垂直滑块，当前值: {{ value }}</p>
      </div>
    `,
  }),
};

export const CustomStyle = {
  name: '自定义样式',
  render: () => ({
    setup() {
      return {
        value: 50,
        handleChange(value) {
          console.log('滑块值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-slider 
          v-model="value" 
          active-color="#ff6b6b"
          inactive-color="#d3d3d3"
          :button-size="20"
          button-color="#ff6b6b"
          @change="handleChange"
        ></van-slider>
        <p style="margin-top: 10px;">自定义颜色，当前值: {{ value }}</p>
      </div>
    `,
  }),
};

export const WithLabels = {
  name: '带标签',
  render: () => ({
    setup() {
      return {
        value: 50,
        handleChange(value) {
          console.log('滑块值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-slider 
          v-model="value" 
          left-text="最小"
          right-text="最大"
          @change="handleChange"
        ></van-slider>
        <p style="margin-top: 10px;">带标签，当前值: {{ value }}</p>
      </div>
    `,
  }),
};

export const Range = {
  name: '范围选择',
  render: () => ({
    setup() {
      return {
        value: [20, 80],
        handleChange(value) {
          console.log('滑块值改变:', value);
        },
      };
    },
    template: `
      <div style="padding: 20px;">
        <van-slider 
          v-model="value" 
          range
          @change="handleChange"
        ></van-slider>
        <p style="margin-top: 10px;">范围选择，当前值: {{ value }}</p>
      </div>
    `,
  }),
};
