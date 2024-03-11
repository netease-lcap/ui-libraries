import React from 'react';
import { List, ListItem, Text } from '@/index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/List',
  component: List,
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
  render: () => (
    <List
      title="带卡片阴影"
      extra="extra"
      renderItem={(item) => {
        return <Text>{item.dataEntity.name}</Text>;
      }}
      tooltip="这是提示"
      style={{ width: 501 }}
    />
  ),
  args: {
    color: 'magenta',
    children: 'Tag',
    dataSource: [
      {
        dataEntity: {
          id: 2824245285177856,
          createdTime: '2024-03-11T02:30:01.000Z',
          updatedTime: '2024-03-11T02:30:01.000Z',
          createdBy: null,
          updatedBy: null,
          name: 'zs',
          age: 22,
          sex: '2',
        },
      },
      {
        dataEntity: {
          id: 2824245417093632,
          createdTime: '2024-03-11T02:30:17.000Z',
          updatedTime: '2024-03-11T02:30:17.000Z',
          createdBy: null,
          updatedBy: null,
          name: 'ls',
          age: 23,
          sex: '2',
        },
      },
      {
        dataEntity: {
          id: 2824245550467584,
          createdTime: '2024-03-11T02:30:33.000Z',
          updatedTime: '2024-03-11T02:30:33.000Z',
          createdBy: null,
          updatedBy: null,
          name: '张三',
          age: 22,
          sex: '1',
        },
      },
      {
        dataEntity: {
          id: 2824245629946368,
          createdTime: '2024-03-11T02:30:43.000Z',
          updatedTime: '2024-03-11T02:30:43.000Z',
          createdBy: null,
          updatedBy: null,
          name: '李四',
          age: 23,
          sex: '1',
        },
      },
      {
        dataEntity: {
          id: 2824245832206848,
          createdTime: '2024-03-11T02:31:07.000Z',
          updatedTime: '2024-03-11T02:31:07.000Z',
          createdBy: null,
          updatedBy: null,
          name: '齐霄',
          age: 18,
          sex: '1',
        },
      },
      {
        dataEntity: {
          id: 2824245896284672,
          createdTime: '2024-03-11T02:31:15.000Z',
          updatedTime: '2024-03-11T02:31:15.000Z',
          createdBy: null,
          updatedBy: null,
          name: '林道',
          age: 23,
          sex: '1',
        },
      },
      {
        dataEntity: {
          id: 2824246099855872,
          createdTime: '2024-03-11T02:31:40.000Z',
          updatedTime: '2024-03-11T02:31:40.000Z',
          createdBy: null,
          updatedBy: null,
          name: '徐子壹',
          age: 19,
          sex: '1',
        },
      },
      {
        dataEntity: {
          id: 2824246179138048,
          createdTime: '2024-03-11T02:31:50.000Z',
          updatedTime: '2024-03-11T02:31:50.000Z',
          createdBy: null,
          updatedBy: null,
          name: '李达',
          age: 23,
          sex: '1',
        },
      },
      {
        dataEntity: {
          id: 2824246276082176,
          createdTime: '2024-03-11T02:32:01.000Z',
          updatedTime: '2024-03-11T02:32:01.000Z',
          createdBy: null,
          updatedBy: null,
          name: '王三锤',
          age: 23,
          sex: '1',
        },
      },
      {
        dataEntity: {
          id: 2824246337554944,
          createdTime: '2024-03-11T02:32:09.000Z',
          updatedTime: '2024-03-11T02:32:09.000Z',
          createdBy: null,
          updatedBy: null,
          name: '李牧',
          age: 32,
          sex: '1',
        },
      },
      {
        dataEntity: {
          id: 2824246618057216,
          createdTime: '2024-03-11T02:32:43.000Z',
          updatedTime: '2024-03-11T02:32:43.000Z',
          createdBy: null,
          updatedBy: null,
          name: '唐糖',
          age: 24,
          sex: '2',
        },
      },
      {
        dataEntity: {
          id: 2824246740544000,
          createdTime: '2024-03-11T02:32:58.000Z',
          updatedTime: '2024-03-11T02:32:58.000Z',
          createdBy: null,
          updatedBy: null,
          name: '李时珍',
          age: 53,
          sex: '1',
        },
      },
      {
        dataEntity: {
          id: 2824246841272832,
          createdTime: '2024-03-11T02:33:10.000Z',
          updatedTime: '2024-03-11T02:33:10.000Z',
          createdBy: null,
          updatedBy: null,
          name: '唐研峰',
          age: 36,
          sex: '1',
        },
      },
      {
        dataEntity: {
          id: 2824246962637312,
          createdTime: '2024-03-11T02:33:25.000Z',
          updatedTime: '2024-03-11T02:33:25.000Z',
          createdBy: null,
          updatedBy: null,
          name: '言道云',
          age: 45,
          sex: '2',
        },
      },
      {
        dataEntity: {
          id: 2824247154608640,
          createdTime: '2024-03-11T02:33:49.000Z',
          updatedTime: '2024-03-11T02:33:49.000Z',
          createdBy: null,
          updatedBy: null,
          name: '许宗明',
          age: 35,
          sex: '1',
        },
      },
      {
        dataEntity: {
          id: 2824247280617984,
          createdTime: '2024-03-11T02:34:04.000Z',
          updatedTime: '2024-03-11T02:34:40.000Z',
          createdBy: null,
          updatedBy: null,
          name: '秦罗敷',
          age: 16,
          sex: '2',
        },
      },
      {
        dataEntity: {
          id: 2824247430572544,
          createdTime: '2024-03-11T02:34:22.000Z',
          updatedTime: '2024-03-11T02:34:22.000Z',
          createdBy: null,
          updatedBy: null,
          name: '镇关西',
          age: 43,
          sex: '1',
        },
      },
      {
        dataEntity: {
          id: 2824247521020416,
          createdTime: '2024-03-11T02:34:33.000Z',
          updatedTime: '2024-03-11T02:34:33.000Z',
          createdBy: null,
          updatedBy: null,
          name: '李道宗',
          age: 36,
          sex: '1',
        },
      },
      {
        dataEntity: {
          id: 2824247746734592,
          createdTime: '2024-03-11T02:35:01.000Z',
          updatedTime: '2024-03-11T02:35:01.000Z',
          createdBy: null,
          updatedBy: null,
          name: '叶遮天',
          age: 19,
          sex: '1',
        },
      },
      {
        dataEntity: {
          id: 2824247889979904,
          createdTime: '2024-03-11T02:35:19.000Z',
          updatedTime: '2024-03-11T02:35:19.000Z',
          createdBy: null,
          updatedBy: null,
          name: '罗大有',
          age: 35,
          sex: '1',
        },
      },
    ],
  },
};
