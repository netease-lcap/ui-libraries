import { VanRate } from '../index';

export default {
  title: 'Components/VanRate',
  component: VanRate,
  parameters: {
    docs: {
      description: {
        component: '评分组件，用于对事物进行评级操作',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: '评分的值',
    },
    count: {
      control: { type: 'number', min: 1, max: 10 },
      description: '图标总数',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '是否为禁用状态',
    },
    readonly: {
      control: { type: 'boolean' },
      description: '是否为只读状态',
    },
    allowHalf: {
      control: { type: 'boolean' },
      description: '是否允许半选',
    },
    size: {
      control: { type: 'number', min: 10, max: 50 },
      description: '图标大小',
    },
    gutter: {
      control: { type: 'number', min: 0, max: 20 },
      description: '图标间距',
    },
    color: {
      control: { type: 'color' },
      description: '选中时的颜色',
    },
    voidColor: {
      control: { type: 'color' },
      description: '未选中时的颜色',
    },
    disabledColor: {
      control: { type: 'color' },
      description: '禁用时的颜色',
    },
    icon: {
      control: { type: 'text' },
      description: '选中时的图标',
    },
    voidIcon: {
      control: { type: 'text' },
      description: '未选中时的图标',
    },
    halfIcon: {
      control: { type: 'text' },
      description: '半选时的图标',
    },
    touchable: {
      control: { type: 'boolean' },
      description: '是否开启点击反馈',
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { VanRate },
  props: Object.keys(argTypes),
  template: `
    <div style="padding: 20px;">
      <van-rate
        v-model="modelValue"
        :count="count"
        :disabled="disabled"
        :readonly="readonly"
        :allow-half="allowHalf"
        :size="size"
        :gutter="gutter"
        :color="color"
        :void-color="voidColor"
        :disabled-color="disabledColor"
        :icon="icon"
        :void-icon="voidIcon"
        :half-icon="halfIcon"
        :touchable="touchable"
        @change="onChange"
        @click="onClick"
      />
      <div style="margin-top: 16px; color: #666;">
        当前评分: {{ modelValue }}
      </div>
    </div>
  `,
  methods: {
    onChange(value) {
      console.log('评分改变:', value);
    },
    onClick(value) {
      console.log('点击评分:', value);
    },
  },
});

export const Basic = Template.bind({});
Basic.args = {
  modelValue: 3,
  count: 5,
  disabled: false,
  readonly: false,
  allowHalf: false,
  size: 20,
  gutter: 4,
  color: '#ffd21e',
  voidColor: '#c8c9cc',
  disabledColor: '#c8c9cc',
  icon: 'star',
  voidIcon: 'star-o',
  halfIcon: 'star',
  touchable: true,
};

export const HalfRate = Template.bind({});
HalfRate.args = {
  ...Basic.args,
  allowHalf: true,
  modelValue: 3.5,
};

export const CustomCount = Template.bind({});
CustomCount.args = {
  ...Basic.args,
  count: 10,
  modelValue: 7,
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  ...Basic.args,
  size: 30,
  gutter: 8,
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  ...Basic.args,
  color: '#ff6b6b',
  voidColor: '#ddd',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Basic.args,
  disabled: true,
  modelValue: 4,
};

export const Readonly = Template.bind({});
Readonly.args = {
  ...Basic.args,
  readonly: true,
  modelValue: 4,
}; 