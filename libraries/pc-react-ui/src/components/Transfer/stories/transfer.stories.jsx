import React from 'react';
import { Transfer } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Transfer',
  component: Transfer,
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
  render: (args) => <Transfer {...args} />,
  args: {
    style: { width: '100px' },

    dataSource: () => new Promise((res) => {
      setTimeout(() => {
        res([
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]);
      }, 3000);
    }),
    // options: () => [
    //   { label: 'Option 1', value: '1' },
    //   { label: 'Option 2', value: '2' },
    //   { label: 'Option 3', value: '3' },
    // ],
    // options: [
    //   { label: 'Option 1', value: '1' },
    //   { label: 'Option 2', value: '2' },
    //   { label: 'Option 3', value: '3' },
    // ],
  },
};
export const 同步函数 = {
  render: (args) => <Transfer {...args} />,
  args: {
    style: { width: '100px' },
    render: (item) => item.title,
    dataSource: [
      { title: 'Option 1', key: '1' },
      { title: 'Option 2', key: '2' },
      { title: 'Option 3', key: '3' },
    ],
  },
};

export const 数组 = {
  render: (args) => <Transfer {...args} />,
  args: {
    style: { width: '100px' },

    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
  },
};
