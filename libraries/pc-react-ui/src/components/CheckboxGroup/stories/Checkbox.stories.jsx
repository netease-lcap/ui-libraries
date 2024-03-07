import React from 'react';
// import { Checkbox as antgroup } from 'antd';
import { Checkbox, CheckboxGroup, Text } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/CheckboxGroup',
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
export const 默认 = {
  render: (args) => {
    return <CheckboxGroup {...args} />;
  },
  args: {
    dataSource: async () => ({
      list: [
        {
          checkbox: {
            id: 1,
            createdTime: null,
            updatedTime: null,
            createdBy: null,
            updatedBy: null,
            name: '苹果',
          },
        },
        {
          checkbox: {
            id: 2,
            createdTime: null,
            updatedTime: null,
            createdBy: null,
            updatedBy: null,
            name: '香蕉',
          },
        },
        {
          checkbox: {
            id: 3,
            createdTime: null,
            updatedTime: null,
            createdBy: null,
            updatedBy: null,
            name: '橘子',
          },
        },
      ],
      total: 3,
    }),
    // dataSource: ['1', 2, 3],
    // textField: 'name',
    // valueField: 'id',
  },
};
export const 静态数据 = {
  render: () => {
    return (
      <CheckboxGroup>
        <Checkbox value="C">
          <Text children="多选框" />
        </Checkbox>
        <Checkbox value="A">
          <Text children="多选框1" />
        </Checkbox>
      </CheckboxGroup>
    );
  },
};
