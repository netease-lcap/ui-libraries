import ElTextareaPro from '../index';
import ValueDemo from '../demos/value.vue';

export default {
  id: 'el-textarea-pro-examples',
  title: '组件列表/Textarea 多行文本框/示例',
  component: ElTextareaPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<el-textarea-pro v-bind="$props"></el-textarea-pro>',
  }),
  argTypes: {
    allowInputOverMax: {
      description: '是否允许输入超过最大长度',
      control: { type: 'boolean' },
    },
    autosize: {
      description: '自适应内容高度',
      control: { type: 'boolean' },
    },
    minRows: {
      description: '最小行数',
      control: { type: 'number' },
    },
    maxRows: {
      description: '最大行数',
      control: { type: 'number' },
    },
    disabled: {
      description: '禁用',
      control: { type: 'boolean' },
    },
    maxlength: {
      description: '最大长度',
      control: { type: 'number' },
    },
    placeholder: {
      description: '占位符',
      control: { type: 'text' },
    },
    readonly: {
      description: '只读',
      control: { type: 'boolean' },
    },
    status: {
      description: '状态',
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
    tips: {
      description: '提示',
      control: { type: 'text' },
    },
  },
};

export const Value = {
  name: '双向绑定',
  render: () => ({
    components: { ValueDemo },
    template: '<ValueDemo />',
  }),
};

export const MaxMin = {
  name: '最大字数限制',
  render: () => ({
    template: `
      <div>
        <el-textarea-pro :maxlength="12"  :allowInputOverMax="true"></el-textarea-pro>
      </div>
    `,
  }),
};
