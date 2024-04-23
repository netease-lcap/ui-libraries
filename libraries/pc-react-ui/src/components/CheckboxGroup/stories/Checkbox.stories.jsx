import React from 'react';
// import { Checkbox as antgroup } from 'antd';
import { Checkbox, CheckboxGroup, Text } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/CheckboxGroup',
  component: Checkbox,
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
  render: (args) => {
    return <CheckboxGroup {...args} />;
  },
  args: {
    dataSource: async () => [11, 22, 33, 444],
    // dataSource: ['1', 2, 3],
    style: { fontSize: '50px' },
    // textField: 'checkbox.name',
    // valueField: 'checkbox.id',
  },
};
export const 静态数据 = {
  render: () => {
    function EmptySlot(params) {
      return <div />;
    }
    return (
      <CheckboxGroup
        data-nodepath="rootview.6.2"
        ide-iscontainer="true"
        key="component-57"
        dataSource={[
          { label: '根据', value: '根据' },
          { label: '数据', value: '数据' },
          { label: '生成', value: '生成' },
        ]}
        textField="entitytestradio.name"
        valueField="entitytestradio.name"
        className="ide-style1"
        item={() => (
          <div ide-draggable="false" data-nodepath="rootview.6.2.0">
            <EmptySlot key="30" />
          </div>
        )}
      />
    );
  },
};
export const 静态数据元素 = {
  render: () => {
    function EmptySlot(params) {
      return <div />;
    }
    return (
      <CheckboxGroup data-nodepath="rootview.6.2">
        <Checkbox value={1} label={1} id="checkbox" data-nodepath="checkbox">
          1
        </Checkbox>
        <Checkbox value={2} label={2}>
          2
        </Checkbox>
      </CheckboxGroup>
    );
  },
};
