import React from 'react';
import { Cascader } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Cascader',
  component: Cascader,
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
  render: (args) => <Cascader {...args} />,
  args: {
    style: { fontSize: '50px' },
    dataSource: () => new Promise((res) => {
      setTimeout(() => {
        res([
          { labels: 'Option 1', key: '1' },
          {
            labels: 'Option 2',
            key: '2',
            children: [{ labels: 'Option 3', key: '3' }],
          },
        ]);
      }, 3000);
    }),
    valueField: 'key',
    textField: 'labels',
  },
};
export const 同步函数 = {
  render: (args) => {
    const [value, onChange] = React.useState();

    return (
      <Cascader
        value={value}
        onChange={onChange}
        dataSource={async () => {
          return [
            {
              entity1: {
                id: 1,
                createdTime: null,
                updatedTime: null,
                createdBy: null,
                updatedBy: null,
                fid: 0,
                name: '选项1',
                sonid: [],
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
                sonid: [],
              },
            },
          ];
        }}
        valueField="entity1.id"
        textField="entity1.name"
        parentField="entity1.fid"
        data-nodepath="1234"
        labelText="234"
      />
    );
  },
  args: {
    dataSource: async () => [
      {
        entity1: {
          id: 1,
          createdTime: null,
          updatedTime: null,
          createdBy: null,
          updatedBy: null,
          fid: 0,
          name: '选项1',
          sonid: [],
        },
        value: 1,
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
          sonid: [],
        },
        value: 2,
      },
    ],
    valueField: 'entity1.id',
    textField: 'entity1.name',
    parentField: 'entity1.fid',
    // parentField: 'a.parentId',
  },
};

export const 数组 = {
  render: (args) => <Cascader {...args} width="ml" />,
  args: {
    dataSource: [
      { label: 'Option 1', key: '1' },
      { label: 'Option 2', key: '2' },
      { label: 'Option 3', key: '3' },
    ],

    'data-nodepath': 1234,
    valueField: 'key',
    textField: 'label',
  },
};
export const ref = {
  render: (args) => {
    const ref = React.useRef({});
    React.useEffect(() => {
      setTimeout(() => {
        console.log(ref, 'ref---');
      }, 1000);
    }, []);
    return <Cascader {...args} ref={ref} width="ml" />;
  },
  args: {
    style: { width: 300 },
  },
};
