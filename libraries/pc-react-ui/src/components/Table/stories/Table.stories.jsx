import React, { useEffect, useRef } from 'react';
import { Table as AntdTable } from 'antd';
import { Table, TableColumn } from '../index';
import { Text } from '../../Text';
import { Select } from '../../Select';
import { Flex } from '@/index';

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
    return (
      <Table {...args}>
        <TableColumn dataIndex="name" title="name" key="11" />
        <TableColumn
          key="2"
          field="entity1.createdTime"
          render={(current) => {
            console.log(current, '====');
            return (
              <Flex gap="small">
                <Text  children={current?.item?.entity1?.createdTime} />
              </Flex>
            );
          }}
          title={<Text children="创建时间" />}
        />
      </Table>
    );
  },
  args: {
    async dataSource(params) {
      console.log(params, 'params');
      return {
        list: [
          {
            entity1: {
              createdTime: 'Assdad',
            },
          },
        ],
        total: 10,
      };
    },
  },
};

export const 异步 = {
  render: (args) => <Table {...args} />,
  args: {
    style: {
      width: '200px',
    },
    scrollY: 500,
    async dataSource(params) {
      return {
        list: [
          {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
          },
          {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
        ],
      };
    },
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ],
  },
};
export const 同步 = {
  render: (args) => {
    const ref = React.useRef({});
    React.useEffect(() => {
      console.log(ref, 'ref');
    }, []);
    return (
      <div>
        <button onClick={() => ref.current.reload()}>13214</button>
        <Table {...args} ref={ref} />
      </div>
    );
  },
  args: {
    async dataSource() {
      return {
        list: [
          {
            key: '1',
            name: '胡彦斌',
            age: Math.random(),
            address: '西湖区湖底公园3号',
          },
          {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
        ],
        total: 10,
      };
    },
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render(...re) {
          console.log(re, 're');
          return <div>1</div>;
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      // {
      //   title: '住址',
      //   dataIndex: 'address',
      //   key: 'address',
      // },
    ],
  },
};
