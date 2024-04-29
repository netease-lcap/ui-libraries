import React from 'react';
import { TreeSelect } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/TreeSelect',
  component: TreeSelect,
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
  render: (args) => <TreeSelect {...args} />,
  args: {
    style: { width: 300 },
    treeCheckable: true,
    treeCheckStrictly: true,
    // labelInValue: false,
    dataSource: [
      {
        entityForSel: {
          id: 1,
          createdTime: null,
          updatedTime: null,
          createdBy: null,
          updatedBy: null,
          fid: 0,
          name: '测试1',
          sonid: [],
        },
      },
      {
        entityForSel: {
          id: 2,
          createdTime: null,
          updatedTime: null,
          createdBy: null,
          updatedBy: null,
          fid: 0,
          name: '测试2',
          sonid: [],
        },
      },
      {
        entityForSel: {
          id: 3,
          createdTime: null,
          updatedTime: null,
          createdBy: null,
          updatedBy: null,
          fid: 1,
          name: '测试1.1',
          sonid: [],
        },
      },
      {
        entityForSel: {
          id: 4,
          createdTime: null,
          updatedTime: null,
          createdBy: null,
          updatedBy: null,
          fid: 3,
          name: '测试1.1.1',
          sonid: [],
        },
      },
      {
        entityForSel: {
          id: 9,
          createdTime: null,
          updatedTime: null,
          createdBy: null,
          updatedBy: null,
          fid: 3,
          name: '测试1.1.1',
          sonid: [],
        },
      },
      {
        entityForSel: {
          id: 5,
          createdTime: null,
          updatedTime: null,
          createdBy: null,
          updatedBy: null,
          fid: 2,
          name: '测试2.1',
          sonid: [],
        },
      },
      {
        entityForSel: {
          id: 2847071043167488,
          createdTime: '2024-04-12T08:29:08.000Z',
          updatedTime: '2024-04-12T08:29:08.000Z',
          createdBy: null,
          updatedBy: null,
          fid: 0,
          name: '测试3',
          sonid: [],
        },
      },
    ],
    onChange: (value) => {
      console.log(value);
    },
    // value: ['理学', '物理学', '理论物理'],
    valueField: 'entityForSel.id',
    textField: 'entityForSel.name',
    parentField: 'entityForSel.fid',
  },
};
export const 同步函数 = {
  render: (args) => <TreeSelect {...args} />,
  args: {
    dataSource: () => [
      { label: 'Option 1', key: '1' },
      { label: 'Option 2', key: '2' },
      { label: 'Option 3', key: '3' },
    ],
    valueField: 'key',

    style: { width: 300 },
    textField: 'label',
  },
};

export const 数组 = {
  render: (args) => <TreeSelect {...args} />,
  args: {
    dataSource: [
      { label: 'Option 1', key: '1' },
      { label: 'Option 2', key: '2' },
      { label: 'Option 3', key: '3' },
    ],
    valueField: 'key',

    style: { width: 300 },
    textField: 'label',
  },
};
