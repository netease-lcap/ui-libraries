import React from 'react';
// import { ProFormDatePicker, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-components';
import { Form } from 'antd';
import { FormItem } from '../index';
import {
  Input, Button, Col, Text,
} from '@/index';

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
    const [form] = Form.useForm();
    // const add = Form.useWatch('username', form);
    // console.log(add, 'add');
    const nameValue = Form.useWatch('name', form);
    // The selector is static and does not support closures.
    const customValue = Form.useWatch((values) => `name: ${values.name || ''}`, form);
    return (
      <div>
        <Form form={form} layout="vertical" autoComplete="off">
          <FormItem name="name" label="Name (Watch to trigger rerender)">
            <Input />
          </FormItem>
          <Form.Item name="age" label="Age (Not Watch)">
            {/* <InputNumber /> */}
          </Form.Item>
        </Form>

        <pre>
          Name Value:
          {nameValue}
        </pre>
        <pre>
          Custom Value:
          {customValue}
        </pre>
      </div>
    );
  },
};
