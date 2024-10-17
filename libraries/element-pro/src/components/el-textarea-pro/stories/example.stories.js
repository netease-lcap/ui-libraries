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

export const Height = {
  name: '高度',
  render: () => ({
    template: `
      <div>
        <el-textarea-pro
          :autosize="false" :minRows="1" :maxRows="5"
          class="cw-style-width cw-style-height cw-style-background-color cw-style-font-style cw-style-font-size cw-style-color cw-style-border-style cw-style-border-color cw-style-border-width cw-style-border-radius"
          placeholder="请输入内容"
          style="--cw-style-width:240px;--cw-style-height:400px;--cw-style-background-color:#22e81f;--cw-style-font-style:italic;--cw-style-font-size:20px;--cw-style-color:#ef120a;--cw-style-border-style:solid;--cw-style-border-color:#0b4bed;--cw-style-border-left-width:3px;--cw-style-border-right-width:3px;--cw-style-border-top-width:3px;--cw-style-border-bottom-width:3px;--cw-style-border-top-left-radius:5px;--cw-style-border-top-right-radius:5px;--cw-style-border-bottom-left-radius:5px;--cw-style-border-bottom-right-radius:5px;width:240px;background-color:#22e81f;font-style:italic;font-size:20px;color:#ef120a;border-top-width:3px;border-left-width:3px;border-right-width:3px;border-bottom-width:3px;border-style:solid;--update-key:fpx8;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px;border-bottom-left-radius:5px;border-color:#0b4bed;height:400px;"></el-textarea-pro>
      </div>
    `,
  }),
};
