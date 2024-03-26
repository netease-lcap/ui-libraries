import React from 'react';
import {
  QueryFilter,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-components';
import { Form, FormItem } from '../index';
import {
  Input,
  Select,
  Switch,
  TreeSelect,
  TextArea,
  DatePicker,
  DateRangePicker,
  TimePicker,
  TimeRangePicker,
  Button,
  QueryForm,
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
    return (
      <Form labelWidth="140">
        <Input labelText="表单输入框" name="name" />
        <Select labelText="表单选择器" name="age" />
        <Switch labelText="表单开关" name="switch" />
        <TreeSelect labelText="表单树选择器" name="tree" />
        <TextArea labelText="表单多行输入" />
        <DatePicker labelText="表单日期选择" />
        <DateRangePicker labelText="表单日期范围选择" />
        <TimePicker labelText="表单时间选择" />
        <TimeRangePicker labelText="表单时间范围选择" />
      </Form>
    );
  },
};

export const 查询表单 = {
  render: () => {
    return (
      <QueryForm labelWidth="140" defaultCollapsed={false}>
        <Input labelText="表单输入框" name="name" />
        <Select labelText="表单选择器" name="age" />
        <Switch labelText="表单开关" name="switch" />
        <TreeSelect labelText="表单树选择器" name="tree" />
        <TextArea labelText="表单多行输入" />
        <DatePicker labelText="表单日期选择" />
        <DateRangePicker labelText="表单日期范围选择" />
        <TimePicker labelText="表单时间选择" />
        <TimeRangePicker labelText="表单时间范围选择" />
      </QueryForm>
    );
  },
};

export const 空表单 = {
  render: () => {
    return <Form />;
  },
};
