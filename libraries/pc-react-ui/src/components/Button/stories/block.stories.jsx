import React from 'react';
import { Button } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Button/blocks',
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
    confirm: {
      options: ['无', 'modalConfirm', 'popConfirm'],
      control: { type: 'select' }, // Automatically inferred when 'options' is defined
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const 主要按钮 = {
  render: () => {
    return <Button type="primary">确定</Button>;
  },
};
export const 次要按钮 = {
  render: () => {
    return <Button>确定</Button>;
  },
};

export const 虚线按钮 = {
  render: () => {
    return <Button type="dashed">确定</Button>;
  },
};
export const 文本按钮 = {
  render: () => {
    return <Button type="text">确定</Button>;
  },
};

export const 链接按钮 = {
  render: () => {
    return <Button type="link">确定</Button>;
  },
};
