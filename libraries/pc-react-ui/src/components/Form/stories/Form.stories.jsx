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
      <Form
        data-nodepath="rootview.0.1.0.1.0.0.0.1"
        ide-iscontainer="true"
        submitter={false}
        key="component-8"
      >
        <FormItem
          data-nodepath="rootview.0.1.0.1.0.0.0.1.0"
          ide-iscontainer="true"
          name="userName"
          rules="[{validate: 'filled',message: `表单项不得为空`,trigger: 'input+blur',required: true}]"
          key="component-9"
          label={(() => (
            <div
              ide-draggable="false"
              data-nodepath="rootview.0.1.0.1.0.0.0.1.0.0"
            >
              <Text
                data-nodepath="rootview.0.1.0.1.0.0.0.1.0.0.0"
                children="用户
"
                key="component-11"
                data-editable="true"
              />
            </div>
          ))()}
        >
          <Input
            data-nodepath="rootview.0.1.0.1.0.0.0.1.0.1"
            data-has-mutation="true"
            placeholder="请输入账号"
            type="text"
            key="component-10"
            style={{ height: '35px' }}
          />
        </FormItem>
        <FormItem
          data-nodepath="rootview.0.1.0.1.0.0.0.1.1"
          ide-iscontainer="true"
          name="passWord"
          rules="[{validate: 'filled',message: `表单项不得为空`,trigger: 'input+blur',required: true}]"
          key="component-12"
          label={(() => (
            <div
              ide-draggable="false"
              data-nodepath="rootview.0.1.0.1.0.0.0.1.1.0"
            >
              <Text
                data-nodepath="rootview.0.1.0.1.0.0.0.1.1.0.0"
                children="密码"
                key="component-14"
                data-editable="true"
              />
            </div>
          ))()}
        >
          <Input
            data-nodepath="rootview.0.1.0.1.0.0.0.1.1.1"
            data-has-mutation="true"
            placeholder="请输入密码"
            type="password"
            key="component-13"
            style={{ height: '35px' }}
          />
        </FormItem>
      </Form>
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
    function EmptySlot(params) {
      return <div />;
    }
    React.useEffect(() => {
      console.log(ref, 'ref');
    }, []);
    return (
      <Form
        data-nodepath="rootview.0.1.0.1.0.0.0.1"
        ide-iscontainer="true"
        submitter={false}
        key="component-25"
      >
        <Input
          data-nodepath="rootview.0.1.0.1.0.0.0.1.0"
          ide-iscontainer="true"
          data-has-mutation="true"
          labelText="表单输入框"
          key="component-26"
          label={(() => (
            <div
              ide-draggable="false"
              data-nodepath="rootview.0.1.0.1.0.0.0.1.0.0"
            >
              <EmptySlot
                data-emptyslot-nodepath="rootview.0.1.0.1.0.0.0.1.0.0"
                key="4"
              />
            </div>
          ))()}
          description={(() => (
            <div
              ide-draggable="false"
              data-nodepath="rootview.0.1.0.1.0.0.0.1.0.1"
            >
              <EmptySlot
                data-emptyslot-nodepath="rootview.0.1.0.1.0.0.0.1.0.1"
                key="5"
              />
            </div>
          ))()}
          extra={(() => (
            <div
              ide-draggable="false"
              data-nodepath="rootview.0.1.0.1.0.0.0.1.0.2"
            >
              <EmptySlot
                data-emptyslot-nodepath="rootview.0.1.0.1.0.0.0.1.0.2"
                key="6"
              />
            </div>
          ))()}
        />
        <FormItem
          data-nodepath="rootview.0.1.0.1.0.0.0.1.1"
          ide-iscontainer="true"
          name="userName"
          rules="[{validate: 'filled',message: `表单项不得为空`,trigger: 'input+blur',required: true}]"
          key="component-27"
          label={(() => (
            <div
              ide-draggable="false"
              data-nodepath="rootview.0.1.0.1.0.0.0.1.1.0"
            >
              <Text
                data-nodepath="rootview.0.1.0.1.0.0.0.1.1.0.0"
                children="用户
"
                key="component-28"
                data-editable="true"
              />
            </div>
          ))()}
        />
        <FormItem
          data-nodepath="rootview.0.1.0.1.0.0.0.1.2"
          ide-iscontainer="true"
          name="passWord"
          rules="[{validate: 'filled',message: `表单项不得为空`,trigger: 'input+blur',required: true}]"
          key="component-29"
          label={(() => (
            <div
              ide-draggable="false"
              data-nodepath="rootview.0.1.0.1.0.0.0.1.2.0"
            >
              <Text
                data-nodepath="rootview.0.1.0.1.0.0.0.1.2.0.0"
                children="密码"
                key="component-30"
                data-editable="true"
              />
            </div>
          ))()}
        />
      </Form>
    );
  },
};
