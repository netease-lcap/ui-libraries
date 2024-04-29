import React from 'react';
import { Input, FormItem } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Input',
  component: Input,
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
    const [value, setValue] = React.useState(1);
    const onchange = React.useCallback((e) => {
      setValue(e);
    });
    React.useEffect(() => {
      console.log(ref, 'ref');
    }, []);
    return (
      <Input
        ref={ref}
        labelText="1234"
        value={value}
        allowClear
        data-nodepath="1234"
        onChange={onchange}
      />
    );
  },
  args: {
    color: 'magenta',
  },
};
