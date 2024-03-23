import React from 'react';
import { QueryFilter, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-components';
import { Form, FormItem } from '../index';
import { Input, Button, Text } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Form/blocks',
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
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const 默认 = {
  render: () => {
    return (
      <Form>
        <FormItem label={<Text children="账号" />} name="username">
          <Input />
        </FormItem>
        <FormItem label={<Text children="密码" />} name="password">
          <Input />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" children="提交" />
        </FormItem>
      </Form>
    );
  },
};
export const 自由表单 = {
  render: () => {
    return <Form />;
  },
};
export const 查询表单 = {
  render: () => {
    return <QueryFilter />;
  },
};
