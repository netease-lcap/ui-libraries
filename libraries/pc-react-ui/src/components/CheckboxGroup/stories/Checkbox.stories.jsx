import React from 'react';
import { Checkbox, CheckboxGroup, Text } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Checkbox',
  component: Checkbox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    originDataSource: {
      options: ['无', 'employee', 'department'],
      control: { type: 'select' }, // Automatically inferred when 'options' is defined
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const 默认 = {
  render: (args) => <CheckboxGroup {...args} />,
  args: {
    dataSource: [{ value: 1, label: '3' }],
  },
};
export const 静态数据 = {
  render: () => {
    return (
      <CheckboxGroup>
        <Checkbox value="C">
          <Text children="多选框" />
        </Checkbox>
        <Checkbox value="A">
          <Text children="多选框1" />
        </Checkbox>
      </CheckboxGroup>
    );
  },
};
