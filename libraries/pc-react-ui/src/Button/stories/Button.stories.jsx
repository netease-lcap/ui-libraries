import React from 'react';
import Button from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Button',
  component: Button,
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
export const Primary = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    type: 'primary',
  },
};
export const Secondary = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    label: 'Button',
  },
};

export const Large = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    size: 'large',
  },
};

export const Small = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {
    size: 'small',
  },
};
