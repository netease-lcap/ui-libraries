import React from 'react';
import { Table as AntdTable } from 'antd';
import Table from '../index';

const { Column, ColumnGroup } = AntdTable;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Table',
  component: Table,
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
    const tableListDataSource = [];
    for (let i = 0; i < 209; i += 1) {
      tableListDataSource.push({
        key: i,
        name: `TradeCode ${i}`,
        updatedAt: Date.now() - Math.floor(Math.random() * 1000),
        createdAt: Date.now() - Math.floor(Math.random() * 2000),
        money: Math.floor(Math.random() * 2000) * i,
      });
    }
    return (
      <Table data-nodePath="12341" rowKey="key" pagination pageSize={10} showQuickJumper search={false} options={false} dataSource={tableListDataSource}>
        <Column sorter defaultSortOrder="descend" key="updatedAt" title="1" dataIndex="updatedAt" />
        <Column key="name" title="2" dataIndex="name" />
      </Table>
    );
  },
  args: {},
};
