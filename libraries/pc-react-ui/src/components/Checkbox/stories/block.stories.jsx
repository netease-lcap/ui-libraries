import React from 'react';
import { Text, Checkbox, CheckboxGroup } from '@/index';
// import { Checkbox, CheckboxGroup } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Checkbox/blocks',
  component: Checkbox,
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
export const 多选框 = {
  render: () => {
    return (
      <Checkbox>
        <Text children="多选框" />
      </Checkbox>
    );
  },
};
// export const 多选组 = {

//   render: () => {
//     return (
//       <CheckboxGroup
//         options={[
//           { label: '苹果', value: 'Apple' },
//           { label: '梨', value: 'Pear' },
//           { label: '句子', value: 'Orange' },
//         ]}
//         children="多选框"
//       />
//     );
//   },
// };
