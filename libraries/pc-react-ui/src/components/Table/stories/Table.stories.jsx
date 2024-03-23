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
    const [value, onChange] = React.useState(3);
    return <Table {...args} value={value} onChange={onChange} />;
  },
  args: {
    title: '12',
    rowSelection: true,
    rowSelectionType: 'radio',
    value: 3,
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
    const [x, setX] = React.useState(null);
    React.useEffect(() => {
      console.log(ref, 'ref');
    }, []);
    function HoistNodePath(params) {
      return <div />;
    }
    return (
      <Table
        data-nodepath="rootview.1.2"
        ide-iscontainer="true"
        key="component-133"
        dataSource={() => ({
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
                int1: 22222,
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
            {
              testEntity1: {
                id: 2824507131035136,
                createdTime: '2024-03-11T11:22:44.000Z',
                updatedTime: '2024-03-11T11:22:44.000Z',
                createdBy: null,
                updatedBy: null,
                boolean1: true,
                text1: '测试文本8',
                int1: 888,
                deci1: 8.88,
                date1: '2024-03-11',
                time1: '19:22:39',
                datetime1: '2024-03-11T11:22:42.000Z',
              },
            },
          ],
          total: 7,
        })}
        search={false}
        options={false}
        rowKey="testEntity1.id"
        rowSelection
        className="ide-style0"
      >
        <TableColumn
          ide-iscontainer="true"
          dataIndex="testEntity1.boolean1"
          key="component-134"
          render={() => (
            <div ide-draggable="false" data-nodepath="rootview.1.2.0.0">
              <Flex data-nodepath="rootview.1.2.0.0.0" ide-iscontainer="true" gap="small" key="component-135">
                <Text data-nodepath="rootview.1.2.0.0.0.0" children="是" key="component-136" data-editable="true" />
                <Text data-nodepath="rootview.1.2.0.0.0.1" children="否" key="component-137" data-editable="true" />
              </Flex>
            </div>
          )}
          title={() => (
            <>
              <HoistNodePath key="57" nodePath="rootview.1.2.0" topSelector="th" />
              <div ide-draggable="false" data-nodepath="rootview.1.2.0.1">
                <Text data-nodepath="rootview.1.2.0.1.0" children="布尔值" key="component-138" data-editable="true" />
              </div>
            </>
          )}
        />
        <TableColumn
          ide-iscontainer="true"
          dataIndex="testEntity1.text1"
          key="component-139"
          render={() => (
            <div ide-draggable="false" data-nodepath="rootview.1.2.1.0">
              <Flex data-nodepath="rootview.1.2.1.0.0" ide-iscontainer="true" gap="small" key="component-140">
                <Text data-nodepath="rootview.1.2.1.0.0.0" children="{{current.item.testEntity1.text1}}" key="component-141" data-editable="true" />
              </Flex>
            </div>
          )}
          title={() => (
            <>
              <HoistNodePath key="58" nodePath="rootview.1.2.1" topSelector="th" />
              <div ide-draggable="false" data-nodepath="rootview.1.2.1.1">
                <Text data-nodepath="rootview.1.2.1.1.0" children="文本" key="component-142" data-editable="true" />
              </div>
            </>
          )}
        />
        <TableColumn
          ide-iscontainer="true"
          dataIndex="testEntity1.int1"
          sorter
          key="component-143"
          render={(current) => (
            <div ide-draggable="false" data-nodepath="rootview.1.2.2.0">
              <Flex data-nodepath="rootview.1.2.2.0.0" ide-iscontainer="true" gap="small" key="component-144">
                <Text data-nodepath="rootview.1.2.2.0.0.0" children={current.item.testEntity1.int1} key="component-145" data-editable="true" />
              </Flex>
            </div>
          )}
          title={() => (
            <>
              <HoistNodePath key="59" nodePath="rootview.1.2.2" topSelector="th" />
              <div ide-draggable="false" data-nodepath="rootview.1.2.2.1">
                <Text data-nodepath="rootview.1.2.2.1.0" children="整数" key="component-146" data-editable="true" />
              </div>
            </>
          )}
        />
        <TableColumn
          ide-iscontainer="true"
          dataIndex="testEntity1.deci1"
          key="component-147"
          render={() => (
            <div ide-draggable="false" data-nodepath="rootview.1.2.3.0">
              <Flex data-nodepath="rootview.1.2.3.0.0" ide-iscontainer="true" gap="small" key="component-148">
                <Text data-nodepath="rootview.1.2.3.0.0.0" children="{{current.item.testEntity1.deci1}}" key="component-149" data-editable="true" />
              </Flex>
            </div>
          )}
          title={() => (
            <>
              <HoistNodePath key="60" nodePath="rootview.1.2.3" topSelector="th" />
              <div ide-draggable="false" data-nodepath="rootview.1.2.3.1">
                <Text data-nodepath="rootview.1.2.3.1.0" children="小数" key="component-150" data-editable="true" />
              </div>
            </>
          )}
        />
        <TableColumn
          ide-iscontainer="true"
          dataIndex="testEntity1.date1"
          key="component-151"
          render={() => (
            <div ide-draggable="false" data-nodepath="rootview.1.2.4.0">
              <Flex data-nodepath="rootview.1.2.4.0.0" ide-iscontainer="true" gap="small" key="component-152">
                <Text data-nodepath="rootview.1.2.4.0.0.0" children="{{current.item.testEntity1.date1}}" key="component-153" data-editable="true" />
              </Flex>
            </div>
          )}
          title={() => (
            <>
              <HoistNodePath key="61" nodePath="rootview.1.2.4" topSelector="th" />
              <div ide-draggable="false" data-nodepath="rootview.1.2.4.1">
                <Text data-nodepath="rootview.1.2.4.1.0" children="日期" key="component-154" data-editable="true" />
              </div>
            </>
          )}
        />
        <TableColumn
          ide-iscontainer="true"
          dataIndex="testEntity1.time1"
          key="component-155"
          render={() => (
            <div ide-draggable="false" data-nodepath="rootview.1.2.5.0">
              <Flex data-nodepath="rootview.1.2.5.0.0" ide-iscontainer="true" gap="small" key="component-156">
                <Text data-nodepath="rootview.1.2.5.0.0.0" children="{{current.item.testEntity1.time1}}" key="component-157" data-editable="true" />
              </Flex>
            </div>
          )}
          title={() => (
            <>
              <HoistNodePath key="62" nodePath="rootview.1.2.5" topSelector="th" />
              <div ide-draggable="false" data-nodepath="rootview.1.2.5.1">
                <Text data-nodepath="rootview.1.2.5.1.0" children="时间" key="component-158" data-editable="true" />
              </div>
            </>
          )}
        />
        <TableColumn
          ide-iscontainer="true"
          dataIndex="testEntity1.datetime1"
          key="component-159"
          render={() => (
            <div ide-draggable="false" data-nodepath="rootview.1.2.6.0">
              <Flex data-nodepath="rootview.1.2.6.0.0" ide-iscontainer="true" gap="small" key="component-160">
                <Text data-nodepath="rootview.1.2.6.0.0.0" children="{{current.item.testEntity1.datetime1}}" key="component-161" data-editable="true" />
              </Flex>
            </div>
          )}
          title={() => (
            <>
              <HoistNodePath key="63" nodePath="rootview.1.2.6" topSelector="th" />
              <div ide-draggable="false" data-nodepath="rootview.1.2.6.1">
                <Text data-nodepath="rootview.1.2.6.1.0" children="日期时间" key="component-162" data-editable="true" />
              </div>
            </>
          )}
        />
        <TableColumn
          ide-iscontainer="true"
          key="component-163"
          render={() => (
            <div ide-draggable="false" data-nodepath="rootview.1.2.7.0">
              <Flex data-nodepath="rootview.1.2.7.0.0" ide-iscontainer="true" key="component-164">
                <Link data-nodepath="rootview.1.2.7.0.0.0" children="修改" key="component-165" data-editable="true" />
                <Link data-nodepath="rootview.1.2.7.0.0.1" children="删除" key="component-166" data-editable="true" />
              </Flex>
            </div>
          )}
          title={() => (
            <>
              <HoistNodePath key="64" nodePath="rootview.1.2.7" topSelector="th" />
              <div ide-draggable="false" data-nodepath="rootview.1.2.7.1">
                <Text data-nodepath="rootview.1.2.7.1.0" children="操作" key="component-167" data-editable="true" />
              </div>
            </>
          )}
        />
      </Table>
    );
  },
  args: {},
};
