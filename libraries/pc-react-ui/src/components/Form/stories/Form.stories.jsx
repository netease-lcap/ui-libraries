import React from 'react';
import { ProFormDatePicker, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-components';
import {
  Input, Button, Form, FormItem,
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
          label="合同约定生效方式"
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

export const 默认2 = {
  render: () => {
    return (
      <Form key="782" data-nodepath="rootview.5" ide-iscontainer="true">
        <FormItem key="783" data-nodepath="rootview.5.0" ide-iscontainer="true" label="Username" name="username" rules="[{validate: 'undefined',message: `undefined`,trigger: 'input+blur'}]">
          <Input key="784" data-nodepath="rootview.5.0.0" />
        </FormItem>
        <FormItem key="785" data-nodepath="rootview.5.1" ide-iscontainer="true" label="Password" name="password" rules="[{validate: 'undefined',message: `undefined`,trigger: 'input+blur'}]">
          <Input key="786" data-nodepath="rootview.5.1.0" />
        </FormItem>
        <FormItem key="787" data-nodepath="rootview.5.2" ide-iscontainer="true" wrapperCol="{   offset: 8,   span: 16 }">
          <Button key="788" data-nodepath="rootview.5.2.0" type="primary" htmlType="submit" children="Submit" />
        </FormItem>
      </Form>
    );
  },
  args: {},
};
