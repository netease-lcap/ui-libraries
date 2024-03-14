import React from 'react';
import {
  ProFormDatePicker, QueryFilter, ProFormDateRangePicker, ProFormSelect,
} from '@ant-design/pro-components';
import { Form as AntdForm } from 'antd';
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
      <div style={{ width: '1000px' }}>
        <QueryFilter defaultCollapsed split>
          <AntdForm.Item label="名字">
            <Input />
          </AntdForm.Item>
          <AntdForm.Item label="名字">
            <Input />
          </AntdForm.Item>
          <AntdForm.Item label="名字">
            <Input />
          </AntdForm.Item>
          <AntdForm.Item label="名字">
            <Input />
          </AntdForm.Item>
          <AntdForm.Item label="名字">
            <Input />
          </AntdForm.Item>
          <AntdForm.Item label="名字">
            <Input />
          </AntdForm.Item>
          <AntdForm.Item label="名字">
            <Input />
          </AntdForm.Item>
        </QueryFilter>
      </div>
    );
  },
};
