import React from 'react';
// import { DateRangePicker } from '../index';

import { DatePicker } from 'antd';
import { DateRangePicker } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/DateRangePicker',
  component: DateRangePicker,
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
  render: (args) => {
    const [value, setValue] = React.useState([
      '2024-03-11T11:34:40.334Z',
      '2024-03-11T11:34:40.334Z',
    ]);
    // setTimeout(() => {
    //   console.log('---');
    //   setValue(null);
    // }, 3000);
    return (
      <DateRangePicker
        // {...args}
        // value={value}
        showTime
        onChange={(e)=>{
          console.log(e)
          setValue(e)
        }}
        data-nodepath="123433"
      />
    );
  },
  args: {
    color: 'magenta',
    onChange(e) {
      console.log(e);
    },
    value: ['2024-03-11T11:34:40.334Z', '2024-03-11T11:34:40.334Z'],
    // defaultStartDate: '2024-03-03',
    showTime: true,
    // defaultEndDate: '2024-03-03',
    // endEmpty: true,
    // endDate: '2024-03-04',
    onEndDateChange(e) {
      // console.log(e);
    },
    onStartDateChange(e) {
      // console.log(e);
    },
  },
};
