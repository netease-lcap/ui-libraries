import ElInputNumberPro from '../index';
import DemoValue from '../demos/value.vue';

export default {
  id: 'el-input-number-pro-examples',
  title: '组件列表/InputNumber 数字输入框/示例',
  component: ElInputNumberPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<el-input-number-pro v-bind="$props"></el-input-number-pro>',
  }),
  argTypes: {
    theme: {
      control: 'select',
      options: ['column', 'row', 'normal'],
    },
  },
};

export const InputProps = {
  name: '输入框属性',
  render: () => ({
    template: '<el-input-number-pro :inputProps="{ autofocus: true, borderless: true }"></el-input-number-pro>',
  }),
};

export const Value = {
  name: '值',
  render: () => ({
    components: { DemoValue },
    template: '<demo-value></demo-value>',
  }),
};
