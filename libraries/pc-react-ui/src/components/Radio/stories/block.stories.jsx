import React from 'react';
import { Radio, RadioGroup, Text } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Radio/blocks',
  component: Radio,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const 默认 = {
  render: (args) => {
    return (
      <Radio>
        <Text children="单选项" />
      </Radio>
    );
  },
};

export const 单选组 = {
  render: (args) => {
    return (
      <RadioGroup>
        <Radio value={1}>
          <Text children="单选项1" />
        </Radio>
        <Radio value={2}>
          <Text children="单选项2" />
        </Radio>
      </RadioGroup>
    );
  },
};
