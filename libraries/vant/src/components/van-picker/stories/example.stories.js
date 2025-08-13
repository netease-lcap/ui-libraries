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
          return [
            {
              tree: {
                id: 3188075897259520,
                createdTime: '2025-08-07T03:25:17.000Z',
                updatedTime: '2025-08-07T03:34:12.000Z',
                createdBy: null,
                updatedBy: null,
                parentid: 0,
                treename222: '父节点2',
              },
            },
            {
              tree: {
                id: 3188076644189696,
                createdTime: '2025-08-07T03:26:48.000Z',
                updatedTime: '2025-08-07T03:34:15.000Z',
                createdBy: null,
                updatedBy: null,
                parentid: 0,
                treename222: '父节点1',
              },
            },
            {
              tree: {
                id: 3188081854883328,
                createdTime: '2025-08-07T03:37:24.000Z',
                updatedTime: '2025-08-07T03:37:24.000Z',
                createdBy: null,
                updatedBy: null,
                parentid: 3188075897259520,
                treename222: '父节点1-孩子节点1',
              },
            },
            {
              tree: {
                id: 3188081919485440,
                createdTime: '2025-08-07T03:37:32.000Z',
                updatedTime: '2025-08-07T03:37:32.000Z',
                createdBy: null,
                updatedBy: null,
                parentid: 3188075897259520,
                treename222: '父节点1-孩子节点2',
              },
            },
            {
              tree: {
                id: 3188082239071744,
                createdTime: '2025-08-07T03:38:11.000Z',
                updatedTime: '2025-08-07T03:38:11.000Z',
                createdBy: null,
                updatedBy: null,
                parentid: 3188075897259520,
                treename222: '父节点2-孩子节点1',
              },
            },
            {
              tree: {
                id: 3188082318419456,
                createdTime: '2025-08-07T03:38:21.000Z',
                updatedTime: '2025-08-07T03:38:21.000Z',
                createdBy: null,
                updatedBy: null,
                parentid: 3188075897259520,
                treename222: '父节点2-孩子节点2',
              },
            },
            {
              tree: {
                id: 3188082453202432,
                createdTime: '2025-08-07T03:38:37.000Z',
                updatedTime: '2025-08-07T03:38:37.000Z',
                createdBy: null,
                updatedBy: null,
                parentid: 3188081854883328,
                treename222: '父节点1-孩子节点1-孙子节点1',
              },
            },
            {
              tree: {
                id: 3188082590918144,
                createdTime: '2025-08-07T03:38:54.000Z',
                updatedTime: '2025-08-07T03:38:54.000Z',
                createdBy: null,
                updatedBy: null,
                parentid: 3188081854883328,
                treename222: '父节点1-孩子节点1-孙子节点2',
              },
            },
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
        textField="tree.treename222"
        valueField="tree.id"
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
