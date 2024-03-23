import React from 'react';
import { Select, SelectOption, FormSelect } from '../index';
// import Select from 'antd';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Select/blocks',
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: [],
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
export const 选择器 = {
  render: () => {
    return (
      <Select style={{ width: 256 }} placeholder="请选择">
        <SelectOption key="1" label="1" value="1" />
        <SelectOption key="2" label="2" value="2" disabled />
      </Select>
    );
  },
};

// export const 表单选择器 = {
//   render: () => {
//     return <FormSelect labelText="表单项" />;
//   },
// };
