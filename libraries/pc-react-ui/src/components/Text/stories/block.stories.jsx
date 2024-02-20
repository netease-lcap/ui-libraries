import React from 'react';
import { Text } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Text/blocks',
  component: Text,
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
export const 普通文本 = {
  render: () => {
    return <Text>普通文本</Text>;
  },
};

export const 辅助文本 = {
  render: () => {
    return <Text type="secondary">辅助文本</Text>;
  },
};

export const 成功文本 = {
  render: () => {
    return <Text type="success">成功文本</Text>;
  },
};
export const 警告文本 = {
  render: () => {
    return <Text type="warning">警告文本</Text>;
  },
};

export const 危险文本 = {
  render: () => {
    return <Text type="danger">危险文本</Text>;
  },
};
export const 禁用文本 = {
  render: () => {
    return <Text disabled>禁用文本</Text>;
  },
};

export const 记号文本 = {
  render: () => {
    return <Text mark>记号文本</Text>;
  },
};

export const 代码文本 = {
  render: () => {
    return <Text code>代码文本</Text>;
  },
};
export const 键盘文本 = {
  render: () => {
    return <Text keyboard>键盘文本</Text>;
  },
};
export const 下划线文本 = {
  render: () => {
    return <Text underline>下划线文本</Text>;
  },
};
export const 删除文本 = {
  render: () => {
    return <Text delete>删除文本</Text>;
  },
};
export const 加粗文本 = {
  render: () => {
    return <Text strong>加粗文本</Text>;
  },
};

export const 斜体文本 = {
  render: () => {
    return <Text italic>斜体文本</Text>;
  },
};
