import React from 'react';
import { ConfigProvider, Button, Space, Input, Divider } from 'antd';
import { Select, SelectOption, SelectOptGroup } from '../index';
import { Text } from '@/index';

// import Select from 'antd';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Select',
  component: Select,
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
export const 异步函数 = {
  render: (args) => {
    const ref = React.useRef({});
    console.log(ref, 'ref');
    React.useEffect(() => {
      console.log(ref, 'ref');
    }, []);
    return (
      <div>
        {ref.current.opened}
        1
        <button onClick={() => ref.current.open()}>1234</button>
        <Select showSearch {...args} prefix="a" ref={ref} />

        <Select dataSource={ref.current?.data} />
      </div>
    );
  },
  args: {
    textField: 'entity1.name',
    valueField: 'entity1.id',
    prefix: '1',
    dataSource: () =>
      new Promise((res) => {
        setTimeout(() => {
          res([
            {
              entity1: {
                id: 1,
                createdTime: null,
                updatedTime: null,
                createdBy: null,
                updatedBy: null,
                fid: 0,
                name: '选项1',
              },
            },
            {
              entity1: {
                id: 2,
                createdTime: null,
                updatedTime: null,
                createdBy: null,
                updatedBy: null,
                fid: 0,
                name: '选项2',
              },
            },
          ]);
        }, 300);
      }),
    onDropdownVisibleChange(e) {
      console.log(1);
    },
  },
};
export const 异步函数1 = {
  render: (args) => {
    function EmptySlot() {
      return <span>1234</span>;
    }
    return (
      <Select
        labelText="1234"
        data-nodepath="rootview.0.0.0.0.1"
        ide-iscontainer="true"
        allowClear
        placeholder="请输入property1"
        key="component-61"
        defaultOpen={false}>
        <SelectOption
          data-nodepath="rootview.0.0.0.0.1.0"
          ide-iscontainer="true"
          value
          label="是"
          key="component-62">
          <EmptySlot key="16" />
        </SelectOption>
        <SelectOption
          data-nodepath="rootview.0.0.0.0.1.1"
          ide-iscontainer="true"
          value={false}
          label="否"
          key="component-63">
          <EmptySlot key="17" />
        </SelectOption>
      </Select>
    );
  },
  args: {
    style: { width: '256px' },
  },
};
