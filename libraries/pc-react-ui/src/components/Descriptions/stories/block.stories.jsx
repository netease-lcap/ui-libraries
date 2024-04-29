import React from 'react';
import { Descriptions, DescriptionsItem } from '../index';
import { Text } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Descriptions/blocks',
  component: Descriptions,
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
      <Descriptions column={2} title="高级定义列表">
        <DescriptionsItem label={<Text children="日期" />} valueType="text">
          <Text children="2024-0222" />
        </DescriptionsItem>
        <DescriptionsItem label={<Text children="日期" />} valueType="text">
          <Text children="2024/2/20- 2024/2/21" />
        </DescriptionsItem>
      </Descriptions>
    );
  },
};
