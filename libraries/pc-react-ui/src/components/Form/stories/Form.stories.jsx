import React from 'react';
import { Form as AntdForm } from 'antd';

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
  TextArea,
  Select,
  InputNumber,
  CheckboxGroup,
  Checkbox,
  DatePicker,
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
    function EmptySlot(params) {
      return <div />;
    }
    function HoistNodePath(params) {
      return <div />;
    }
    return (
      <div style={{ width: '1200px' }}>
        {/* <Select width="xl" /> */}
        <ProFormText />
        <Form
          layout="horizontal"
          // labelCol={{ flex: '500px' }}
          // labelWidth="100"
          span={12}
          gutterJustify={30}
          width="100%"
        >
          <Cascader labelText="123" width="100%" name="username" />
          <Select ref={ref} labelText="表单项内容" />
          {/* <button onClick={() => console.log(ref.current.getValues())}>
            1234
          </button> */}
          {/* <TextArea /> */}
          <ProFormText />
          <DatePicker data-nodepath="3333" />
          <CheckboxGroup
            data-nodepath="rootview.0.0"
            ide-iscontainer="true"
            key="component-37"
          >
            <Checkbox ide-iscontainer="true" key="component-38">
              1234
            </Checkbox>
          </CheckboxGroup>
          <CheckboxGroup data-nodepath="rootview.6.2">
            <Checkbox
              value={1}
              label={1}
              id="checkbox"
              data-nodepath="checkbox"
            >
              1
            </Checkbox>
            <Checkbox value={2} label={2}>
              2
            </Checkbox>
          </CheckboxGroup>
          <InputNumber />
          {/* <Select
            name="ag"
            dataSource={[
              { value: 1, label: '男' },
              { value: 2, label: '女' },
            ]}
          /> */}
          <Input />
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
      // const value=ref.current.getValue()
      // CSSMathValue.name id time
      <div style={{ width: '1500px' }}>
        <QueryForm>
          <Cascader labelText="123" name="username" />
          <Cascader labelText="123" name="id" />
          <Cascader labelText="23" name="time" />
          <Cascader labelText="23" />
          <Cascader labelText="23" />
          <Cascader labelText="23" />
          <Cascader labelText="23" />
        </QueryForm>
      </div>
    );
  },
};
export const Pro表单 = {
  render: () => {
    const ref = React.useRef(null);
    React.useEffect(() => {
      console.log(ref, 'ref');
    }, []);
    return (
      <div>
        <button
          onClick={() => {
            console.log(ref);
          }}
        >
          1234
        </button>
        <Form>
          <Select ref={ref} />
          {/* <ProFormText fieldProps={{ ref }} label="132" width="xl" /> */}
          {/* <ProFormText label="132" width="sm" />
          <ProFormText label="132" width="lg" />
          <ProFormText label="132" width="xl" /> */}
        </Form>
      </div>
    );
  },
};
