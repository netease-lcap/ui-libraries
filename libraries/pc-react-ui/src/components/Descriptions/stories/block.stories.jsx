import React from 'react';
import { Descriptions, DescriptionsItem } from '../index';

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
        <DescriptionsItem
          label="日期"
          fieldProps={{
            format: 'YYYY.MM.DD',
          }}
          valueType="date"
        >
          2024/2/20
        </DescriptionsItem>
        <DescriptionsItem
          label="日期区间"
          fieldProps={{
            format: 'YYYY.MM.DD HH:mm:ss',
          }}
          valueType="dateTimeRange"
        >
          2024/2/20- 2024/2/21
        </DescriptionsItem>
        <DescriptionsItem
          label="时间"
          fieldProps={{
            format: 'YYYY.MM.DD',
          }}
          valueType="time"
        >
          2024/2/20: 12:00:00
        </DescriptionsItem>
      </Descriptions>
    );
  },
};
