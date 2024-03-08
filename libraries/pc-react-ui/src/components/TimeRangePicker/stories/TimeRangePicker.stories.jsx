import React from 'react';
import { TimeRangePicker } from '../index';
import { TimePicker } from 'antd';

// const TimeRangePicker = TimePicker.RangePicker;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/TimeRangePicker',
  component: TimeRangePicker,
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
  render: (args) => <TimeRangePicker use12Hours showNow data-nodepath="1234" />,
  args: {
    color: 'magenta',
    showNow: true,
    children: 'Tag',
  },
};
