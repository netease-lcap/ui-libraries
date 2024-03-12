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
    const ref = React.useRef({});
    React.useEffect(() => {
      console.log(ref, 'ref');
    }, []);
    return (
      <Form ref={ref}>
        <FormItem
          span={25}
          label={<Text children="账号" />}
          rules={[
            { validate: 'lowerCase', message: '不能出现大写字母', trigger: 'input+blur' },
            { validate: 'integer', message: '请输入整数', trigger: 'input+blur' },
            {
              validate: 'max',
              args: [30],
              message: `不能大于${30}`,
              trigger: 'input+blur',
            },
          ]}
        >
          <Input />
        </FormItem>
        <button
          onClick={async () => {
            console.log(await ref.current.validate());
          }}
        >
          123
        </button>
      </Form>
    );
  },
};
