import { VanSearch } from '../index';

export default {
  title: 'Components/VanSearch',
  component: VanSearch,
  parameters: {
    docs: {
      description: {
        component: '搜索框组件，用于搜索功能',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: '搜索框的值',
    },
    placeholder: {
      control: { type: 'text' },
      description: '占位符',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否为禁用状态',
    },
    readonly: {
      control: { type: 'boolean' },
      description: '是否为只读状态',
    },
    clearable: {
      control: { type: 'boolean' },
      description: '是否可清除',
    },
    clearTrigger: {
      control: { type: 'select' },
      options: ['always', 'focus'],
      description: '清除图标的显示时机',
    },
    inputAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: '对齐方式',
    },
    iconAlign: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: '搜索图标位置',
    },
    shape: {
      control: { type: 'select' },
      options: ['square', 'round'],
      description: '形状',
    },
    background: {
      control: { type: 'color' },
      description: '背景色',
    },
    maxlength: {
      control: { type: 'number', min: 0 },
      description: '最大字符数',
    },
    autofocus: {
      control: { type: 'boolean' },
      description: '自动聚焦',
    },
    actionText: {
      control: { type: 'text' },
      description: '按钮文字',
    },
    showAction: {
      control: { type: 'boolean' },
      description: '是否显示操作按钮',
    },
    autocomplete: {
      control: { type: 'boolean' },
      description: '是否启用自动完成',
    },
    spellcheck: {
      control: { type: 'boolean' },
      description: '是否开启拼写检查',
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { VanSearch },
  props: Object.keys(argTypes),
  template: `
    <div style="padding: 20px;">
      <van-search
        v-model="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :clearable="clearable"
        :clear-trigger="clearTrigger"
        :input-align="inputAlign"
        :icon-align="iconAlign"
        :shape="shape"
        :background="background"
        :maxlength="maxlength"
        :autofocus="autofocus"
        :action-text="actionText"
        :show-action="showAction"
        :autocomplete="autocomplete"
        :spellcheck="spellcheck"
        @search="onSearch"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @icon-search="onIconSearch"
        @click-input="onClickInput"
        @clear="onClear"
        @action="onAction"
      />
      <div style="margin-top: 16px; color: #666;">
        当前值: {{ modelValue }}
      </div>
    </div>
  `,
  methods: {
    onSearch(value) {
      console.log('搜索:', value);
    },
    onInput(value) {
      console.log('输入:', value);
    },
    onFocus(event) {
      console.log('获得焦点:', event);
    },
    onBlur(event) {
      console.log('失去焦点:', event);
    },
    onIconSearch(event) {
      console.log('点击搜索图标:', event);
    },
    onClickInput(event) {
      console.log('点击输入区域:', event);
    },
    onClear(event) {
      console.log('清除:', event);
    },
    onAction(event) {
      console.log('点击操作按钮:', event);
    },
  },
});

export const Basic = Template.bind({});
Basic.args = {
  modelValue: '',
  placeholder: '请输入搜索关键词',
  disabled: false,
  readonly: false,
  clearable: true,
  clearTrigger: 'focus',
  inputAlign: 'left',
  iconAlign: 'left',
  shape: 'square',
  background: '#f7f8fa',
  maxlength: undefined,
  autofocus: false,
  actionText: '',
  showAction: false,
  autocomplete: false,
  spellcheck: false,
};

export const WithAction = Template.bind({});
WithAction.args = {
  ...Basic.args,
  showAction: true,
  actionText: '搜索',
};

export const RoundShape = Template.bind({});
RoundShape.args = {
  ...Basic.args,
  shape: 'round',
};

export const CenterAlign = Template.bind({});
CenterAlign.args = {
  ...Basic.args,
  inputAlign: 'center',
};

export const RightIcon = Template.bind({});
RightIcon.args = {
  ...Basic.args,
  iconAlign: 'right',
};

export const CustomBackground = Template.bind({});
CustomBackground.args = {
  ...Basic.args,
  background: '#e8f4fd',
};

export const MaxLength = Template.bind({});
MaxLength.args = {
  ...Basic.args,
  maxlength: 20,
  placeholder: '最多输入20个字符',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Basic.args,
  disabled: true,
  modelValue: '禁用状态',
};

export const Readonly = Template.bind({});
Readonly.args = {
  ...Basic.args,
  readonly: true,
  modelValue: '只读状态',
}; 