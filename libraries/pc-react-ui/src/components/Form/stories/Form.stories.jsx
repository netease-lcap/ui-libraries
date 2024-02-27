import React from 'react';
import { ProFormDatePicker, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-components';
import {
  Input, Button, Form, FormItem, Text,
} from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Form',
  component: Form,
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
  render: () => {
    return (
      <Form>
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: '盖章后生效',
            },
          ]}
          width="sm"
          name="useMode"
          label={<Text children="表单项" />}
        />
        <ProFormDateRangePicker
          transform={(values) => {
            return {
              startTime: values ? values[0] : undefined,
              endTime: values ? values[1] : undefined,
            };
          }}
          width="md"
          name="createTimeRanger"
          label="合同生效时间"
        />
        <ProFormDatePicker width="md" name="expirationTime" label="合同失效时间" />
      </Form>
    );
  },
  args: {},
};
