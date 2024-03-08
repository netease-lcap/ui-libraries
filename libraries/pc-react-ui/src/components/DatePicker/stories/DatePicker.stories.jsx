import React from 'react';
import { DatePicker } from '../index';
// import { DatePicker } from 'antd';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/DatePicker',
  component: DatePicker,
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
    const ref = React.useRef({});
    React.useEffect(() => {
      console.log(ref, 'ref');
    }, []);
    return <DatePicker {...args} ref={ref} data-nodepath="12213" />;
  },
  args: {
    color: 'magenta',
    onOpenChange() {
      console.log(2134);
    },
    children: 'Tag',
  },
};
