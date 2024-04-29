import React from 'react';
import { TimePicker } from '../index';
import 'dayjs/locale/zh-cn';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/TimePicker',
  component: TimePicker,
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
    const [value, setValue] = React.useState(undefined);
    React.useEffect(() => {}, []);
    return (
      <div>
        {' '}
        <TimePicker
          {...args}
          data-nodepath="1234‰"
          value={value}
          onChange={(e) => {
            console.log(e);
            setValue(e);
          }}
        />
        {value}
      </div>
    );
  },
  args: {
    color: 'magenta',
    locale: {
      placeholder: '请选择日期',
    },
  },
};
