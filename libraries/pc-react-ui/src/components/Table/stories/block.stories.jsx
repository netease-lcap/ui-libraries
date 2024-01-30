import React from 'react';
import Table, { Column } from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Table/blocks',
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
    originDataSource: {},
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const 默认 = {
  render: () => {
    return (
      <Table
        rowKey="key"
        pagination
        pageSize={10}
        search={false}
        options={false}
        dataSource={[
          {
            key: 0,
            name: 'TradeCode 0',
            updatedAt: 1706605108593,
            createdAt: 1706605109454,
            money: 0,
          },
          {
            key: 1,
            name: 'TradeCode 1',
            updatedAt: 1706605109540,
            createdAt: 1706605109301,
            money: 97,
          },
        ]}
      >
        <Column key="money" title="金额" dataIndex="money" />
        <Column key="createdAt" title="创建时间" dataIndex="createdAt" />
        <Column key="updatedAt" title="更新时间" dataIndex="updatedAt" />
        <Column key="name" title="名称" dataIndex="name" />
      </Table>
    );
  },
  args: {},
};
