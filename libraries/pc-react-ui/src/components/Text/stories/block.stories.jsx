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
    return <Text children="普通文本" />;
  },
};

export const 辅助文本 = {
  render: () => {
    return <Text type="secondary" children="辅助文本" />;
  },
};

export const 成功文本 = {
  render: () => {
    return <Text type="success" children="成功文本" />;
  },
};
export const 警告文本 = {
  render: () => {
    return <Text type="warning" children="警告文本" />;
  },
};

export const 危险文本 = {
  render: () => {
    return <Text type="danger" children="危险文本" />;
  },
};
export const 禁用文本 = {
  render: () => {
    return <Text disabled children="禁用文本" />;
  },
};

export const 记号文本 = {
  render: () => {
    return <Text mark children="记号文本" />;
  },
};

export const 代码文本 = {
  render: () => {
    return <Text code children="代码文本" />;
  },
};
export const 键盘文本 = {
  render: () => {
    return <Text keyboard children="键盘文本" />;
  },
};
export const 下划线文本 = {
  render: () => {
    return <Text underline children="下划线文本" />;
  },
};
export const 删除文本 = {
  render: () => {
    return <Text delete children="删除文本" />;
  },
};
export const 加粗文本 = {
  render: () => {
    return <Text strong children="加粗文本" />;
  },
};

export const 斜体文本 = {
  render: () => {
    return <Text italic children="斜体文本" />;
  },
};
