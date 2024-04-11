import React from 'react';
import { Card } from '../index';
import { Text } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Card/blocks',
  component: Card,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const 基本样式 = {
  render: () => {
    return (
      <Card
        title={<Text children="标题" style={{ fontSize: 'inherit' }} />}
        bordered
      />
    );
  },
};
export const 分割线样式 = {
  render: () => {
    return (
      <Card
        title={<Text children="标题" style={{ fontSize: 'inherit' }} />}
        headerBordered
        bordered
      />
    );
  },
};
