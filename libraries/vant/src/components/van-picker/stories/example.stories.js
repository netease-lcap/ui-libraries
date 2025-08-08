import { ref } from 'vue';
import VanPicker from '../index';

export default {
  id: 'van-picker-examples',
  title: '组件列表/Picker 选择器/示例',
  component: VanPicker,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '基础用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      const value = ref(['2']);
      const pickerRef = ref(null);
      setTimeout(() => {
        console.log(pickerRef, '==pickerRef');
      }, 3000);
      return {
        args,
        value,
        pickerRef,
        columns: async () => {
          await new Promise((resolve) => setTimeout(resolve, 3000));
          return [
            { text: '选项1', value: '1' },
            { text: '选项2', value: '2' },
            { text: '选项3', value: '3' },
          ];
        },
        handleChange(event) {
          console.log('选中值变化:', event);
        },
        handleClear() {
          console.log('清空选择');
        },
        handleVisibleChange(visible) {
          console.log('显示状态变化:', visible);
        },
      };
    },
    template: `
      <van-picker 
        v-model="value"
        placeholder="xx"
        ref="pickerRef"
        :dataSource="columns"
        @change="handleChange"
        @clear="handleClear"
      />
    `,
  }),
  args: {
    placeholder: '请选择选项',
    clearable: true,
    disabled: false,
    readonly: false,
    loading: false,
    multiple: false,
    filterable: false,
    size: 'default',
  },
};

export const Multiple = {
  name: '多选',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        columns: [
          { text: '选项1', value: '1' },
          { text: '选项2', value: '2' },
          { text: '选项3', value: '3' },
          { text: '选项4', value: '4' },
          { text: '选项5', value: '5' },
        ],
        handleChange(event) {
          console.log('选中值变化:', event);
        },
      };
    },
    template: `
      <van-picker 
        v-bind="args" 
        :columns="columns"
        @change="handleChange"
      />
    `,
  }),
  args: {
    placeholder: '请选择多个选项',
    clearable: true,
    multiple: true,
    size: 'default',
  },
};

export const Disabled = {
  name: '禁用状态',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        columns: [
          { text: '选项1', value: '1' },
          { text: '选项2', value: '2' },
          { text: '选项3', value: '3' },
        ],
      };
    },
    template: `
      <van-picker 
        v-bind="args" 
        :columns="columns"
      />
    `,
  }),
  args: {
    placeholder: '禁用状态',
    disabled: true,
  },
};

export const Loading = {
  name: '加载状态',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        columns: [],
      };
    },
    template: `
      <van-picker 
        v-bind="args" 
        :columns="columns"
      />
    `,
  }),
  args: {
    placeholder: '加载中',
    loading: true,
  },
};

export const DifferentSizes = {
  name: '不同尺寸',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
        columns: [
          { text: '选项1', value: '1' },
          { text: '选项2', value: '2' },
          { text: '选项3', value: '3' },
        ],
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <van-picker 
          v-bind="args" 
          :columns="columns"
          size="small"
          placeholder="小尺寸"
        />
        <van-picker 
          v-bind="args" 
          :columns="columns"
          size="default"
          placeholder="默认尺寸"
        />
        <van-picker 
          v-bind="args" 
          :columns="columns"
          size="large"
          placeholder="大尺寸"
        />
      </div>
    `,
  }),
  args: {
    clearable: true,
  },
};
