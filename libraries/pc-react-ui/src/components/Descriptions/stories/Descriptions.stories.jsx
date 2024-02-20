import React from 'react';
import dayjs from 'dayjs';
import { Descriptions, DescriptionsItem } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Descriptions',
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
    originDataSource: {
      options: ['无', 'employee', 'department'],
      control: { type: 'select' }, // Automatically inferred when 'options' is defined
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const 默认 = {
  render: () => (
    <Descriptions column={2} title="高级定义列表" tooltip="包含了从服务器请求，columns等功能">
      <DescriptionsItem
        label="日期"
        fieldProps={{
          format: 'YYYY.MM.DD',
        }}
        valueType="date"
      >
        {dayjs().valueOf()}
      </DescriptionsItem>
      <DescriptionsItem
        label="日期区间"
        fieldProps={{
          format: 'YYYY.MM.DD HH:mm:ss',
        }}
        valueType="dateTimeRange"
      >
        {[dayjs().add(-1, 'd').valueOf(), dayjs().valueOf()]}
      </DescriptionsItem>
      <DescriptionsItem
        label="时间"
        fieldProps={{
          format: 'YYYY.MM.DD',
        }}
        valueType="time"
      >
        {dayjs().valueOf()}
      </DescriptionsItem>
    </Descriptions>
  ),
  args: {
    color: 'magenta',
    children: 'Tag',
  },
};
