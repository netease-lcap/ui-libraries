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
    multiple: true,
    dataSource: [
      {
        text: '理学',
        value: '理学',
        children: [
          {
            text: '物理学',
            value: '物理学',
            children: [
              { text: '理论物理', value: '理论物理' },
              { text: '凝聚态物理', value: '凝聚态物理' },
              { text: '材料物理', value: '材料物理' },
            ],
          },
          {
            text: '数学',
            value: '数学',
            children: [
              { text: '基础数学', value: '基础数学', disabled: true },
              { text: '计算数学', value: '计算数学' },
              { text: '应用数学', value: '应用数学' },
            ],
          },
          { text: '化学', value: '化学' },
        ],
      },
      {
        text: '工学',
        value: '工学',
        children: [
          {
            text: '计算机科学与技术',
            value: '计算机科学与技术',
            children: [
              { text: '计算机系统结构', value: '计算机系统结构' },
              {
                text: '计算机软件与理论',
                value: '计算机软件与理论',
                disabled: true,
              },
              { text: '计算机应用技术', value: '计算机应用技术' },
            ],
          },
          { text: '软件工程', value: '软件工程', disabled: true },
          {
            text: '机械工程',
            value: '机械工程',
            children: [
              { text: '机械制造及其自动化', value: '机械制造及其自动化' },
              { text: '机械电子工程', value: '机械电子工程' },
              {
                text: '机械设计及理论',
                value: '机械设计及理论',
                disabled: true,
              },
              { text: '车辆工程', value: '车辆工程', disabled: true },
            ],
          },
        ],
      },
    ],
    valueField: 'text',
    textField: 'value',
    // parentField: 'a.parentId',
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
