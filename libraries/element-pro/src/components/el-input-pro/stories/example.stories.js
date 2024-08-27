import ElInputPro from '../index';

export default {
  id: 'el-input-pro-examples',
  title: '组件列表/Input 输入框/示例',
  component: ElInputPro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<el-input-pro v-bind="$props"></el-input-pro>',
  }),
  // args: {
  //   align: 'right',
  // },
  argTypes: {
    align: {
      description: '对齐方式',
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    allowInputOverMax: {
      description: '允许输入超过最大值',
      control: 'boolean',
    },
    autoWidth: {
      description: '自动宽度',
      control: 'boolean',
    },
    autocomplete: {
      description: '自动完成',
      control: 'text',
    },
    autofocus: {
      description: '自动聚焦',
      control: 'boolean',
    },
    borderless: {
      description: '无边框',
      control: 'boolean',
    },
    clearable: {
      description: '可清空',
      control: 'boolean',
    },
    disabled: {
      description: '禁用',
      control: 'boolean',
    },
    maxcharacter: {
      description: '最大字符数',
      control: 'number',
    },
    maxlength: {
      description: '最大长度',
      control: 'number',
    },
    placeholder: {
      description: '占位符',
      control: 'text',
    },
    readonly: {
      description: '只读',
      control: 'boolean',
    },
    showClearIconOnEmpty: {
      description: '输入框为空时显示清空按钮',
      control: 'boolean',
    },
    showLimitNumber: {
      description: '显示字符数统计',
      control: 'boolean',
    },
    size: {
      description: '尺寸',
      control: 'select',
      options: ['medium', 'small', 'large'],
    },
    status: {
      description: '状态',
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
    type: {
      description: '类型',
      control: 'select',
      options: ['text', 'number', 'url', 'tel', 'password', 'search', 'submit', 'hidden'],
    },
  },
};

export const Align = {
  name: '对齐方式',
  render: () => ({
    template: `
      <div>
        <div>右</div>
        <el-input-pro align="right"></el-input-pro>
        <div>居中</div>
        <el-input-pro align="center"></el-input-pro>
        <div>左</div>
        <el-input-pro align="left"></el-input-pro>
      </div>
    `,
  }),
};

export const Disabled = {
  name: '禁用状态',
  render: () => ({
    template: '<el-input-pro disabled></el-input-pro>',
  }),
};

export const AllowInputOverMax = {
  name: '允许输入超过最大值',
  render: () => ({
    template: '<el-input-pro :allow-input-over-max="true" :maxlength="12"></el-input-pro>',
  }),
};

export const AutoWidth = {
  name: '自动宽度',
  render: () => ({
    template: '<el-input-pro auto-width></el-input-pro>',
  }),
};

export const Slots = {
  name: '插槽',
  render: () => ({
    template: `
      <el-input-pro>
        <template #label>
          <span>名称：</span>
        </template>

        <template #prefixIcon>
          <span>前缀图标</span>
        </template>

        <template #suffix>
          <span>元</span>
        </template>


        <template #suffixIcon>
          <span>后缀图标</span>
        </template>

        <template #tips>
          <span>这是一段提示文案</span>
        </template>

      </el-input-pro>
    `,
  }),
};
