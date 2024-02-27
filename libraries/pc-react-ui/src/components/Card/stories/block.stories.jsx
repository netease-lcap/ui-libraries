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
    return <Card title={<Text children="标题" style="font-size:inherit" />} style={{ width: 501 }} bordered />;
  },
};
export const 分割线样式 = {
  render: () => {
    return <Card title={<Text children="标题" style="font-size:inherit"  />} headerBordered bordered style={{ width: 300 }} />;
  },
};
export const 无标题样式 = {
  render: () => {
    return <Card cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />} headerBordered bordered style={{ width: 300 }} />;
  },
};
