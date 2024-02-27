import React from 'react';
import { Tabs, TabPane, Text } from '@/index';
// import { Tabs } from 'antd';

// const { TabPane } = Tabs;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Tabs/blocks',
  component: Tabs,
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
export const 基本用法 = {
  render: () => {
    return (
      <Tabs>
        <TabPane key="1" tab={<Text children="选项卡1" />} />
        <TabPane key="2" tab={<Text children="选项卡2" />} />
        <TabPane key="3" tab={<Text children="选项卡3" />} />
      </Tabs>
    );
  },
};
export const 卡片效果 = {
  render: () => {
    return (
      <Tabs type="card">
        <TabPane key="1" tab={<Text children="选项卡1" />} />
        <TabPane key="2" tab={<Text children="选项卡2" />} />
        <TabPane key="3" tab={<Text children="选项卡3" />} />
      </Tabs>
    );
  },
};
export const 动态卡片 = {
  render: () => {
    return (
      <Tabs type="editable-card">
        <TabPane key="1" tab={<Text children="选项卡1" />} />
        <TabPane key="2" tab={<Text children="选项卡2" />} />
        <TabPane key="3" tab={<Text children="选项卡3" />} />
      </Tabs>
    );
  },
};
