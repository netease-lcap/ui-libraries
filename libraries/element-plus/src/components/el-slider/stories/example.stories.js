import { ElSlider } from '../index';

export default {
  id: 'el-slider-examples',
  title: '组件列表/Slider/示例',
  component: ElSlider,
  argTypes: {
    modelValue: {
      control: { type: 'number' },
      description: 'binding value',
      defaultValue: 0,
    },
    min: {
      control: { type: 'number' },
      description: 'minimum value',
      defaultValue: 0,
    },
    max: {
      control: { type: 'number' },
      description: 'maximum value',
      defaultValue: 100,
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'whether Slider is disabled',
      defaultValue: false,
    },
    step: {
      control: { type: 'number' },
      description: 'step size',
      defaultValue: 1,
    },
    showInput: {
      control: { type: 'boolean' },
      description: 'whether to display an input box',
      defaultValue: false,
    },
    showStops: {
      control: { type: 'boolean' },
      description: 'whether to display breakpoints',
      defaultValue: false,
    },
    showTooltip: {
      control: { type: 'boolean' },
      description: 'whether to display tooltip value',
      defaultValue: true,
    },
    range: {
      control: { type: 'boolean' },
      description: 'whether to select a range',
      defaultValue: false,
    },
    vertical: {
      control: { type: 'boolean' },
      description: 'vertical mode',
      defaultValue: false,
    },
  },
};

const Template = (args) => ({
  setup() {
    return { args };
  },
  template: `
    <div style="width: 500px; margin: 20px;">
      <el-slider v-bind="args" />
    </div>
  `,
});

export const Basic = Template.bind({});
Basic.args = {
  modelValue: 50,
};

export const Range = Template.bind({});
Range.args = {
  modelValue: [20, 80],
  range: true,
};

export const WithInput = Template.bind({});
WithInput.args = {
  modelValue: 50,
  showInput: true,
};

export const WithStops = Template.bind({});
WithStops.args = {
  modelValue: 50,
  step: 10,
  showStops: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  modelValue: 50,
  disabled: true,
};

export const Vertical = (args) => ({
  setup() {
    return { args };
  },
  template: `
    <div style="height: 300px; margin: 20px;">
      <el-slider v-bind="args" vertical height="300px" />
    </div>
  `,
});
Vertical.args = {
  modelValue: 50,
};
