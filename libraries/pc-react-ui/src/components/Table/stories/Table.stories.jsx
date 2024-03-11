import React, { useEffect, useRef } from 'react';
import { Table as AntdTable } from 'antd';
import { Table, TableColumn } from '../index';
import { Text } from '../../Text';
import { Select } from '../../Select';
import { Flex, Link } from '@/index';

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
    scrollX: { control: 'number' },
    originDataSource: {
      options: ['无', 'employee', 'department'],
      control: { type: 'select' }, // Automatically inferred when 'options' is defined
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const 默认 = {
  render: (args) => {
    return <Table {...args} />;
  },
  args: {
    title: '12',
    rowSelection: true,
    rowKey: 'key',
    showQuickJumper: true,
    onChange(e) {
      console.log(e, '3');
    },

    async dataSource(params) {
      return {
        list: new Array(50).fill(1).map((item, index) => ({
          key: index,
          name: '胡彦斌',

          age: Math.random(),
          address: '西湖区湖底公园1号',
        })),
      };
    },
    // pageSize: 5,
    // pagination: false,
    // scrollY:1000,
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        sorter: true,
        // defaultSortOrder: 'ascend',
        // dataIndex: 'age',
        key: 'name',
      },
      {
        title: '年龄',
        sorter: true,
        // defaultSortOrder: 'ascend',
        dataIndex: 'age',
        key: 'age',
      },
    ],
  },
};

export const 异步 = {
  render: (args) => <Table {...args} />,
  args: {
    style: {
      width: '1200px',
    },
    scrollY: 500,
    // pagination: false,
    onBefore: (...e) => {
      // console.log(...e, '==');
    },
    onSuccess: (...e) => {
      // console.log(...e, 'success');
    },
    onDoubleClick: (...e) => {
      console.log(...e, 'onClickRow');
    },
    async dataSource(params) {
      return {
        list: new Array(50).fill(1).map((item, index) => ({
          key: index,
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        })),
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
export const 同步33 = {
  render: (args) => {
    const ref = React.useRef({});

    return (
      <Table
        dataSource={async () => ({
          list: [
            {
              testEntity1: {
                id: 2,
                createdTime: null,
                updatedTime: '2024-03-09T14:05:06.000Z',
                createdBy: 'testuser',
                updatedBy: 'testuser',
                boolean1: false,
                text1: '测试文本2',
                int1: 2222,
                deci1: 2.22,
                date1: '2024-03-03',
                time1: '00:00:03',
                datetime1: '2024-03-09T06:05:05.000Z',
              },
            },
            {
              testEntity1: {
                id: 3,
                createdTime: null,
                updatedTime: '2024-03-09T14:04:56.000Z',
                createdBy: null,
                updatedBy: null,
                boolean1: true,
                text1: '测试文本3',
                int1: 333,
                deci1: 3.33,
                date1: '2024-03-08',
                time1: '00:00:04',
                datetime1: '2024-03-09T06:03:44.000Z',
              },
            },
            {
              testEntity1: {
                id: 2824250327277056,
                createdTime: '2024-03-11T02:40:16.000Z',
                updatedTime: '2024-03-11T02:40:16.000Z',
                createdBy: null,
                updatedBy: null,
                boolean1: true,
                text1: '测试文本4',
                int1: 444,
                deci1: 4.44,
                date1: '2024-03-11',
                time1: '10:39:56',
                datetime1: '2024-03-11T02:39:59.000Z',
              },
            },
            {
              testEntity1: {
                id: 2824337469390336,
                createdTime: '2024-03-11T05:37:33.000Z',
                updatedTime: '2024-03-11T05:37:33.000Z',
                createdBy: null,
                updatedBy: null,
                boolean1: false,
                text1: '测试文本5',
                int1: 555,
                deci1: 5.55,
                date1: '2024-03-11',
                time1: '13:37:27',
                datetime1: '2024-03-11T05:37:32.000Z',
              },
            },
            {
              testEntity1: {
                id: 2824337732861440,
                createdTime: '2024-03-11T05:38:06.000Z',
                updatedTime: '2024-03-11T05:38:06.000Z',
                createdBy: null,
                updatedBy: null,
                boolean1: true,
                text1: '测试文本6',
                int1: 666,
                deci1: 6.66,
                date1: '2024-03-11',
                time1: '13:38:01',
                datetime1: '2024-03-11T05:38:05.000Z',
              },
            },
            {
              testEntity1: {
                id: 2824337915305472,
                createdTime: '2024-03-11T05:38:28.000Z',
                updatedTime: '2024-03-11T05:38:28.000Z',
                createdBy: null,
                updatedBy: null,
                boolean1: false,
                text1: '测试文本7',
                int1: 777,
                deci1: 7.77,
                date1: '2024-03-11',
                time1: '13:38:23',
                datetime1: '2024-03-11T05:38:26.000Z',
              },
            },
          ],
          total: 6,
        })}
        search={false}
        options={false}
        rowKey="testEntity1.id"
        scrollX={1000}
        rowSelection
      >
        <TableColumn
          dataIndex="testEntity1.boolean1"
          width={300}
          fixed="left"
          render={(current: any) => (
            <Flex gap="small">
              {/* {current?.item?.testEntity1?.boolean1 ? <Text>是</Text> : undefined} */}
              {/* {!current?.item?.testEntity1?.boolean1 ? <Text>否</Text> : undefined} */}
            </Flex>
          )}
          title={(
            <Text>布尔值</Text>
          )}
        />
        <TableColumn
          dataIndex="testEntity1.text1"
          width={300}
          render={(current: any) => (
            <Flex gap="small">
              <Text>{current?.item?.testEntity1?.text1}</Text>
            </Flex>
          )}
          title={(
            <Text>文本</Text>
          )}
        />
        <TableColumn
          dataIndex="testEntity1.int1"
          width={300}
          sorter
          render={(current: any) => (
            <Flex gap="small">
              <Text>{current?.item?.testEntity1?.int1}</Text>
            </Flex>
          )}
          title={(
            <Text>整数</Text>
          )}
        />
        <TableColumn
          dataIndex="testEntity1.deci1"
          width={300}
          render={(current: any) => (
            <Flex gap="small">
              <Text>{current?.item?.testEntity1?.deci1}</Text>
            </Flex>
          )}
          title={(
            <Text>小数</Text>
          )}
        />
        <TableColumn
          dataIndex="testEntity1.date1"
          width={300}
          render={(current: any) => (
            <Flex gap="small">
              <Text>{current?.item?.testEntity1?.date1}</Text>
            </Flex>
          )}
          title={(
            <Text>日期</Text>
          )}
        />
        <TableColumn
          dataIndex="testEntity1.time1"
          width={300}
          render={(current: any) => (
            <Flex gap="small">
              <Text>{current?.item?.testEntity1?.time1}</Text>
            </Flex>
          )}
          title={(
            <Text>时间</Text>
          )}
        />
        <TableColumn
          dataIndex="testEntity1.datetime1"
          width={300}
          render={(current: any) => (
            <Flex gap="small">
              <Text>{current?.item?.testEntity1?.datetime1}</Text>
            </Flex>
          )}
          title={(
            <Text>日期时间</Text>
          )}
        />
        <TableColumn
          width={300}
          fixed="right"
          render={(current: any) => (
            <Flex>
              <Link onClick={(event) => localStore.Link3Click(event, current1, current)}>修改</Link>
              <Link onClick={(event) => localStore.Link4Click(event, current1, current)}>删除</Link>
            </Flex>
          )}
          title={(
            <Text>操作</Text>
          )}
        />
      </Table>
    );
  },
  args: {},
};
