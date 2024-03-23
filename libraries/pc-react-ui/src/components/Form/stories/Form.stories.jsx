import React from 'react';
import { Form as AntdForm, InputNumber } from 'antd';

import {
  ProForm,
  ProFormText,
  ProFormCascader,
  QueryFilter,
} from '@ant-design/pro-components';
import {
  Input,
  Button,
  Form,
  FormItem,
  Text,
  Select,
  FormSelect,
  QueryForm,
  Cascader,
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
      console.log(ref, 'ref----');
    }, []);
    return (
      <div style={{ width: '1200px' }}>
        <Select width="xl" />
        <Form ref={ref} layout="horizontal">
          {/* <button onClick={() => console.log(ref.current.getValues())}>
            1234
          </button> */}
          <ProFormText label="1234" width="md" colProps={{ span: 8 }} />
          <Select
            labelText="1234"
            name="ag"
            span={16}
            // colProps={{ span: 16 }}
            dataSource={[
              { value: 1, label: '男' },
              { value: 2, label: '女' },
            ]}
          />
        </Form>
      </div>
    );
  },
};
export const 默认1 = {
  render: () => {
    const ref = React.useRef({});
    return (
      <div>
        <Form ref={ref}>
          <Select labelIsSlot={false} />
          <FormItem label={<Text children="账号" />} name="username">
            <Input />
          </FormItem>
          <FormItem required label={<Text children="密码" />} name="password">
            <Input
              onChange={() => {
                console.log(1234);
              }}
            />
          </FormItem>
          <FormItem>
            <Button
              onClick={() => console.log(ref.current.validate())}
              type="primary"
              htmlType="submit"
              children="提交"
            />
          </FormItem>
        </Form>
      </div>
    );
  },
};
export const 查询表单 = {
  render: () => {
    return (
      <div style={{ width: '1500px' }}>
        <QueryForm>
          <Cascader labelText="123" />
          {/* <ProFormCascader label="pro" /> */}
          <Cascader labelText="123" />
          <Cascader labelText="23" />
          <Cascader labelText="23" />
          <Cascader labelText="23" />
          <Cascader labelText="23" />
          <Cascader labelText="23" />
          {/* <ProFormCascader label="pro" /> */}
          {/* <ProFormText label="132" width="xl" />
          <ProFormText label="132" width="sm" />
          <ProFormText label="132" width="700" /> */}
          {/* <Input />
        <Input />
        <Input /> */}
        </QueryForm>
      </div>
    );
  },
};
export const Pro表单 = {
  render: () => {
    return (
      <div>
        <ProForm width="lg">
          <ProFormText label="132" width="xl" />
          <ProFormText label="132" width="sm" />
          <ProFormText label="132" width="lg" />
          <ProFormText label="132" width="xl" />
        </ProForm>
      </div>
    );
  },
};
