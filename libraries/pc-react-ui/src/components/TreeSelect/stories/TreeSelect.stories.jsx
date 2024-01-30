import React from 'react';
import TreeSelect from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/TreeSelect',
  component: TreeSelect,
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
  render: (args) => <TreeSelect {...args} />,
  args: {
    style: { width: 300 },
    dataSource: () => new Promise((res) => {
      setTimeout(() => {
        res([
          { label: 'Option 1', key: '1' },
          {
            label: 'Option 2',
            key: '2',
            children: [{ label: 'Option 3', key: '3' }],
          },
        ]);
      }, 3000);
    }),
    valueField: 'key',
    textField: 'label',
  },
};
export const 同步函数 = {
  render: (args) => <TreeSelect {...args} />,
  args: {
    dataSource: () => [
      { label: 'Option 1', key: '1' },
      { label: 'Option 2', key: '2' },
      { label: 'Option 3', key: '3' },
    ],
    valueField: 'key',
    textField: 'label',
  },
};

export const 数组 = {
  render: (args) => <TreeSelect {...args} />,
  args: {
    dataSource: [
      { label: 'Option 1', key: '1' },
      { label: 'Option 2', key: '2' },
      { label: 'Option 3', key: '3' },
    ],
    valueField: 'key',
    textField: 'label',
  },
};
