import React from 'react';
import Select, { SelectOption } from '../index';
// import Select from 'antd';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Select/block',
  component: Select,
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
export const 异步函数 = {
  render: (args) => {
    // const Option = () => <div />;
    return (
      <Select {...args}>
        <SelectOption key="1" label="1" value="1" />
        <SelectOption key="2" label="2" value="2" disabled />
      </Select>
    );
  },
  args: {
    style: { width: '100px' },
    // options: [
    // { label: 'Option 1', value: '1' },
    // { label: 'Option 2', value: '2' },
    // { label: 'Option 3', value: '3' },
    // ],
  },
};
export const 同步函数 = {
  render: (args) => <Select {...args} />,
  args: {
    style: { width: '100px' },

    options: () => [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
  },
};

export const 数组 = {
  render: (args) => <Select {...args} />,
  args: {
    style: { width: '100px' },

    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
  },
};
