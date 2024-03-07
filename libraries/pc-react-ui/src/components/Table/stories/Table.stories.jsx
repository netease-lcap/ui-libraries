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
    pageSize: 5,
    // scrollY:1000,
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
    const [x, setX] = React.useState(null);
    React.useEffect(() => {
      console.log(ref, 'ref');
      setTimeout(() => {
        setX(2000);
        console.log('2000');
      }, 3000);
      setTimeout(() => {
        setX(null);
        console.log('null');
      }, 16000);
    }, []);

    return (
      <Table
        data-nodepath="rootview.0"
        ide-iscontainer="true"
        dataSource={[{}, {}, {}]}
        search={false}
        options={false}
        bordered
        virtual={false}
        scrollX={x}
        scrollY={null}
        rowSelection={false}
        pagination
        pageSizeOptions={[5, 20, 50]}
        pageSize={5}
        className="ide-style0"
      >
        <TableColumn
          ide-iscontainer="true"
          field="swjhTestData1.createdTime"
          fixed
          width={203}
          colSpan={1}
          render={() => (
            <Flex data-nodepath="rootview.0.0.0.0" ide-iscontainer="true" gap="small">
              <Text data-nodepath="rootview.0.0.0.0.0" children="{{current.item.swjhTestData1.createdTime}}" />
            </Flex>
          )}
          title={() => <Text data-nodepath="rootview.0.0.1.0" children="创建时间" />}
        />
        <TableColumn
          ide-iscontainer="true"
          field="swjhTestData1.updatedTime"
          fixed
          width={200}
          colSpan={1}
          render={() => (
            <Flex data-nodepath="rootview.0.1.0.0" ide-iscontainer="true" gap="small">
              <Text data-nodepath="rootview.0.1.0.0.0" children="{{current.item.swjhTestData1.updatedTime}}" />
            </Flex>
          )}
          title={() => <Text data-nodepath="rootview.0.1.1.0" children="更新时间" />}
        />
        <TableColumn
          ide-iscontainer="true"
          field="swjhTestData1.createdBy"
          width={200}
          colSpan={1}
          render={() => (
            <Flex data-nodepath="rootview.0.2.0.0" ide-iscontainer="true" gap="small">
              <Text data-nodepath="rootview.0.2.0.0.0" children="{{current.item.swjhTestData1.createdBy}}" />
            </Flex>
          )}
          title={() => <Text data-nodepath="rootview.0.2.1.0" children="创建者" />}
        />
        <TableColumn
          ide-iscontainer="true"
          field="swjhTestData1.updatedBy"
          width={200}
          colSpan={1}
          dataIndex=""
          render={() => (
            <Flex data-nodepath="rootview.0.3.0.0" ide-iscontainer="true" gap="small">
              <Text data-nodepath="rootview.0.3.0.0.0" children="{{current.item.swjhTestData1.updatedBy}}" />
            </Flex>
          )}
          title={() => <Text data-nodepath="rootview.0.3.1.0" children="更新者" />}
        />
        <TableColumn
          ide-iscontainer="true"
          field="swjhTestData1.testProperty1"
          dataIndex=""
          width={1000}
          colSpan={1}
          render={() => (
            <Flex data-nodepath="rootview.0.4.0.0" ide-iscontainer="true" gap="small">
              <Text data-nodepath="rootview.0.4.0.0.0" children="{{current.item.swjhTestData1.testProperty1}}" />
            </Flex>
          )}
          title={() => <Text data-nodepath="rootview.0.4.1.0" children="testProperty1" />}
        />
        <TableColumn
          ide-iscontainer="true"
          field="swjhTestData1.testProperty2"
          width={1000}
          dataIndex=""
          colSpan={1}
          render={() => (
            <Flex data-nodepath="rootview.0.5.0.0" ide-iscontainer="true" gap="small">
              <Text data-nodepath="rootview.0.5.0.0.0" children="{{current.item.swjhTestData1.testProperty2}}" />
            </Flex>
          )}
          title={() => <Text data-nodepath="rootview.0.5.1.0" children="testProperty2" />}
        />
        <TableColumn
          ide-iscontainer="true"
          field="swjhTestData1.testProperty2"
          colSpan={1}
          width={200}
          render={() => (
            <Flex data-nodepath="rootview.0.6.0.0" ide-iscontainer="true" gap="small">
              <Text data-nodepath="rootview.0.6.0.0.0" children="{{current.item.swjhTestData1.testProperty2}}" />
            </Flex>
          )}
          title={() => <Text data-nodepath="rootview.0.6.1.0" children="testProperty2" />}
        />
        <TableColumn
          ide-iscontainer="true"
          field="swjhTestData1.testProperty2"
          width={200}
          colSpan={1}
          render={() => (
            <Flex data-nodepath="rootview.0.7.0.0" ide-iscontainer="true" gap="small">
              <Text data-nodepath="rootview.0.7.0.0.0" children="{{current.item.swjhTestData1.testProperty2}}" />
            </Flex>
          )}
          title={() => <Text data-nodepath="rootview.0.7.1.0" children="testProperty2" />}
        />
        <TableColumn
          ide-iscontainer="true"
          field="swjhTestData1.testProperty2"
          width={200}
          colSpan={1}
          render={() => (
            <Flex data-nodepath="rootview.0.8.0.0" ide-iscontainer="true" gap="small">
              <Text data-nodepath="rootview.0.8.0.0.0" children="{{current.item.swjhTestData1.testProperty2}}" />
            </Flex>
          )}
          title={() => <Text data-nodepath="rootview.0.8.1.0" children="testProperty2" />}
        />
        <TableColumn
          ide-iscontainer="true"
          field="swjhTestData1.testProperty2"
          width={200}
          colSpan={1}
          render={() => (
            <Flex data-nodepath="rootview.0.9.0.0" ide-iscontainer="true" gap="small">
              <Text data-nodepath="rootview.0.9.0.0.0" children="{{current.item.swjhTestData1.testProperty2}}" />
            </Flex>
          )}
          title={() => <Text data-nodepath="rootview.0.9.1.0" children="testProperty2" />}
        />
        <TableColumn
          ide-iscontainer="true"
          width={200}
          colSpan={1}
          render={() => (
            <Flex data-nodepath="rootview.0.10.0.0" ide-iscontainer="true">
              <Link data-nodepath="rootview.0.10.0.0.0" children="修改" />
              <Link data-nodepath="rootview.0.10.0.0.1" children="删除" />
            </Flex>
          )}
          title={() => <Text data-nodepath="rootview.0.10.1.0" children="操作" />}
        />
      </Table>
    );
  },
  args: {},
};
