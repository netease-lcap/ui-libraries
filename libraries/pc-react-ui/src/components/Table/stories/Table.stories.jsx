import React, { useState, useEffect, useRef } from 'react';
import { Table as AntdTable } from 'antd';
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
} from '@ant-design/pro-components';
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
    const ref = React.useRef();
    const [data, setDataSource] = React.useState([]);
    React.useEffect(() => {
      setTimeout(() => {
        setDataSource([null]);
      }, 3000);
      // console.log(ref, 'ref');
    }, []);
    return (
      <div>
        <button
          onClick={() => {
            ref.current.reload();
          }}
        >
          1234
        </button>
        {JSON.stringify(data)}
        <Table dataSource={data} ref={ref} value={value} onChange={onChange} />
      </div>
    );
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
      const list = new Array(50).fill(1).map((item, index) => ({
        key: index,
        name: '胡彦斌',
        age: Math.random(),
        address: '西湖区湖底公园1号',
      }));
      return {
        list,
        // .map((item) => {
        //   return {

        //   };
        // }),
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
        onCell: (_, index) => {
          if (index === 3) {
            return { rowSpan: 2 };
          }
          // These two are merged into above cell
          if (index === 4) {
            return { rowSpan: 0 };
          }
          if (index === 5) {
            return { rowSpan: 0 };
          }
          return {};
        },
        key: 'namez123',
      },
      {
        title: '年龄',
        sorter: true,
        // defaultSortOrder: 'ascend',
        dataIndex: 'age',
        key: 'ag1234e',
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
    sticky: true,
    async dataSource(params) {
      console.log(params, 'params,====');
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
        sorter: true,
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
    const [sticky, setSticky] = React.useState(false);
    React.useEffect(() => {
      console.log(ref, 'ref');
      setTimeout(() => {
        setSticky(true);
        console.log(11111);
      }, 3000);
    }, []);
    function HoistNodePath(params) {
      return <div />;
    }
    return (
      <div>
        {`${sticky}sticky`}
        <button onClick={() => setSticky((el) => !el)}>123</button>
        <Table
          data-nodepath="rootview.0"
          key={`component-270${sticky}`}
          dataSource={[{}, {}, {}]}
          search={false}
          options={false}
          rowKey="lCAPPerResMapping.id"
          sticky={sticky}
          className="ide-style0"
        >
          <TableColumn
            ide-iscontainer="true"
            dataIndex="lCAPPerResMapping.createdTime"
            key="component-271"
            render={() => (
              <>
                <HoistNodePath
                  key="126"
                  nodePath="rootview.0.0"
                  topSelector="td"
                  data-nodepath-multiple="true"
                />
                <div ide-draggable="false" data-nodepath="rootview.0.0.0">
                  <Flex
                    data-nodepath="rootview.0.0.0.0"
                    ide-iscontainer="true"
                    gap="small"
                    key="component-272"
                  >
                    <Text
                      data-nodepath="rootview.0.0.0.0.0"
                      children="{{current.item.lCAPPerResMapping.createdTime}}"
                      key="component-273"
                      data-editable="true"
                    />
                  </Flex>
                </div>
              </>
            )}
            title={() => (
              <>
                <HoistNodePath
                  key="127"
                  nodePath="rootview.0.0"
                  topSelector="th"
                  data-nodepath-multiple="true"
                />
                <div ide-draggable="false" data-nodepath="rootview.0.0.1">
                  <Text
                    data-nodepath="rootview.0.0.1.0"
                    children="创建时间"
                    key="component-274"
                    data-editable="true"
                  />
                </div>
              </>
            )}
          />
          <TableColumn
            ide-iscontainer="true"
            dataIndex="lCAPPerResMapping.updatedTime"
            key="component-275"
            render={() => (
              <>
                <HoistNodePath
                  key="128"
                  nodePath="rootview.0.1"
                  topSelector="td"
                  data-nodepath-multiple="true"
                />
                <div ide-draggable="false" data-nodepath="rootview.0.1.0">
                  <Flex
                    data-nodepath="rootview.0.1.0.0"
                    ide-iscontainer="true"
                    gap="small"
                    key="component-276"
                  >
                    <Text
                      data-nodepath="rootview.0.1.0.0.0"
                      children="{{current.item.lCAPPerResMapping.updatedTime}}"
                      key="component-277"
                      data-editable="true"
                    />
                  </Flex>
                </div>
              </>
            )}
            title={() => (
              <>
                <HoistNodePath
                  key="129"
                  nodePath="rootview.0.1"
                  topSelector="th"
                  data-nodepath-multiple="true"
                />
                <div ide-draggable="false" data-nodepath="rootview.0.1.1">
                  <Text
                    data-nodepath="rootview.0.1.1.0"
                    children="更新时间"
                    key="component-278"
                    data-editable="true"
                  />
                </div>
              </>
            )}
          />
          <TableColumn
            ide-iscontainer="true"
            dataIndex="lCAPPerResMapping.createdBy"
            key="component-279"
            render={() => (
              <>
                <HoistNodePath
                  key="130"
                  nodePath="rootview.0.2"
                  topSelector="td"
                  data-nodepath-multiple="true"
                />
                <div ide-draggable="false" data-nodepath="rootview.0.2.0">
                  <Flex
                    data-nodepath="rootview.0.2.0.0"
                    ide-iscontainer="true"
                    gap="small"
                    key="component-280"
                  >
                    <Text
                      data-nodepath="rootview.0.2.0.0.0"
                      children="{{current.item.lCAPPerResMapping.createdBy}}"
                      key="component-281"
                      data-editable="true"
                    />
                  </Flex>
                </div>
              </>
            )}
            title={() => (
              <>
                <HoistNodePath
                  key="131"
                  nodePath="rootview.0.2"
                  topSelector="th"
                  data-nodepath-multiple="true"
                />
                <div ide-draggable="false" data-nodepath="rootview.0.2.1">
                  <Text
                    data-nodepath="rootview.0.2.1.0"
                    children="创建者"
                    key="component-282"
                    data-editable="true"
                  />
                </div>
              </>
            )}
          />
          <TableColumn
            ide-iscontainer="true"
            dataIndex="lCAPPerResMapping.updatedBy"
            key="component-283"
            render={() => (
              <>
                <HoistNodePath
                  key="132"
                  nodePath="rootview.0.3"
                  topSelector="td"
                  data-nodepath-multiple="true"
                />
                <div ide-draggable="false" data-nodepath="rootview.0.3.0">
                  <Flex
                    data-nodepath="rootview.0.3.0.0"
                    ide-iscontainer="true"
                    gap="small"
                    key="component-284"
                  >
                    <Text
                      data-nodepath="rootview.0.3.0.0.0"
                      children="{{current.item.lCAPPerResMapping.updatedBy}}"
                      key="component-285"
                      data-editable="true"
                    />
                  </Flex>
                </div>
              </>
            )}
            title={() => (
              <>
                <HoistNodePath
                  key="133"
                  nodePath="rootview.0.3"
                  topSelector="th"
                  data-nodepath-multiple="true"
                />
                <div ide-draggable="false" data-nodepath="rootview.0.3.1">
                  <Text
                    data-nodepath="rootview.0.3.1.0"
                    children="更新者"
                    key="component-286"
                    data-editable="true"
                  />
                </div>
              </>
            )}
          />
          <TableColumn
            ide-iscontainer="true"
            dataIndex="lCAPPerResMapping.permissionId"
            key="component-287"
            render={() => (
              <>
                <HoistNodePath
                  key="134"
                  nodePath="rootview.0.4"
                  topSelector="td"
                  data-nodepath-multiple="true"
                />
                <div ide-draggable="false" data-nodepath="rootview.0.4.0">
                  <Flex
                    data-nodepath="rootview.0.4.0.0"
                    ide-iscontainer="true"
                    gap="small"
                    key="component-288"
                  >
                    <Text
                      data-nodepath="rootview.0.4.0.0.0"
                      children="{{current.item.lCAPPermission.createdTime}}"
                      key="component-289"
                      data-editable="true"
                    />
                  </Flex>
                </div>
              </>
            )}
            title={() => (
              <>
                <HoistNodePath
                  key="135"
                  nodePath="rootview.0.4"
                  topSelector="th"
                  data-nodepath-multiple="true"
                />
                <div ide-draggable="false" data-nodepath="rootview.0.4.1">
                  <Text
                    data-nodepath="rootview.0.4.1.0"
                    children="权限唯一ID"
                    key="component-290"
                    data-editable="true"
                  />
                </div>
              </>
            )}
            style={{ width: '299px' }}
          />
          <TableColumn
            ide-iscontainer="true"
            dataIndex="lCAPPerResMapping.resourceId"
            key="component-291"
            render={() => (
              <>
                <HoistNodePath
                  key="136"
                  nodePath="rootview.0.5"
                  topSelector="td"
                  data-nodepath-multiple="true"
                />
                <div ide-draggable="false" data-nodepath="rootview.0.5.0">
                  <Flex
                    data-nodepath="rootview.0.5.0.0"
                    ide-iscontainer="true"
                    gap="small"
                    key="component-292"
                  >
                    <Text
                      data-nodepath="rootview.0.5.0.0.0"
                      children="{{current.item.lCAPResource.createdTime}}"
                      key="component-293"
                      data-editable="true"
                    />
                  </Flex>
                </div>
              </>
            )}
            title={() => (
              <>
                <HoistNodePath
                  key="137"
                  nodePath="rootview.0.5"
                  topSelector="th"
                  data-nodepath-multiple="true"
                />
                <div ide-draggable="false" data-nodepath="rootview.0.5.1">
                  <Text
                    data-nodepath="rootview.0.5.1.0"
                    children="资源唯一ID"
                    key="component-294"
                    data-editable="true"
                  />
                </div>
              </>
            )}
            style={{ width: '200px' }}
          />
          <TableColumn
            ide-iscontainer="true"
            key="component-295"
            render={() => (
              <>
                <HoistNodePath
                  key="138"
                  nodePath="rootview.0.6"
                  topSelector="td"
                  data-nodepath-multiple="true"
                />
                <div ide-draggable="false" data-nodepath="rootview.0.6.0">
                  <Flex
                    data-nodepath="rootview.0.6.0.0"
                    ide-iscontainer="true"
                    key="component-296"
                  >
                    <Link
                      data-nodepath="rootview.0.6.0.0.0"
                      children="修改"
                      key="component-297"
                      data-editable="true"
                    />
                    <Link
                      data-nodepath="rootview.0.6.0.0.1"
                      children="删除"
                      key="component-298"
                      data-editable="true"
                    />
                  </Flex>
                </div>
              </>
            )}
            title={() => (
              <>
                <HoistNodePath
                  key="139"
                  nodePath="rootview.0.6"
                  topSelector="th"
                  data-nodepath-multiple="true"
                />
                <div ide-draggable="false" data-nodepath="rootview.0.6.1">
                  <Text
                    data-nodepath="rootview.0.6.1.0"
                    children="操作"
                    key="component-299"
                    data-editable="true"
                  />
                </div>
              </>
            )}
          />
        </Table>
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
    const defaultData = [
      {
        id: 624748504,
        title: '活动名称一',
        readonly: '活动名称一',
        decs: '这个活动真好玩',
        state: 'open',
        created_at: 1590486176000,
        update_at: 1590486176000,
      },
      {
        id: 624691229,
        title: '活动名称二',
        readonly: '活动名称二',
        decs: '这个活动真好玩',
        state: 'closed',
        created_at: 1590481162000,
        update_at: 1590481162000,
      },
    ];
    const [editableKeys, setEditableRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [position, setPosition] = useState('bottom');

    const columns = [
      {
        title: '活动名称',
        dataIndex: 'title',
        tooltip: '只读，使用form.getFieldValue获取不到值',
        formItemProps: (form, { rowIndex }) => {
          return {
            rules:
              rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
          };
        },
        // 第一行不允许编辑
        editable: (text, record, index) => {
          return index !== 0;
        },
        width: '15%',
      },
      {
        title: 'Other',
        children: [
          {
            title: 'Age',
            dataIndex: 'readonly',
            key: 'age',
            width: 150,
          },
          {
            title: 'Age2',
            dataIndex: 'readonly',
            key: 'age',
            width: 150,
          },
        ],
      },
      {
        title: '活动名称二',
        dataIndex: 'readonly',
        tooltip: '只读，使用form.getFieldValue可以获取到值',
        readonly: true,
        width: '15%',
      },
      {
        title: '状态',
        key: 'state',
        dataIndex: 'state',
        valueType: 'select',
        valueEnum: {
          all: { text: '全部', status: 'Default' },
          open: {
            text: '未解决',
            status: 'Error',
          },
          closed: {
            text: '已解决',
            status: 'Success',
          },
        },
      },
      {
        title: '描述',
        dataIndex: 'decs',
        fieldProps: (form, { rowKey, rowIndex }) => {
          if (form.getFieldValue([rowKey || '', 'title']) === '不好玩') {
            return {
              disabled: true,
            };
          }
          if (rowIndex > 9) {
            return {
              disabled: true,
            };
          }
          return {};
        },
      },
      {
        title: '活动时间',
        dataIndex: 'created_at',
        valueType: 'date',
      },
      {
        title: '操作',
        valueType: 'option',
        width: 200,
        render: (text, record, _, action) => [
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            编辑
          </a>,
          <a
            key="delete"
            onClick={() => {
              setDataSource(dataSource.filter((item) => item.id !== record.id));
            }}
          >
            删除
          </a>,
        ],
      },
    ];

    return (
      <>
        <EditableProTable
          rowKey="id"
          headerTitle="可编辑表格"
          maxLength={5}
          scroll={{
            x: 960,
          }}
          recordCreatorProps={
            position !== 'hidden'
              ? {
                position,
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
              }
              : false
          }
          loading={false}
          toolBarRender={() => [
            <ProFormRadio.Group
              key="render"
              fieldProps={{
                value: position,
                onChange: (e) => setPosition(e.target.value),
              }}
              options={[
                {
                  label: '添加到顶部',
                  value: 'top',
                },
                {
                  label: '添加到底部',
                  value: 'bottom',
                },
                {
                  label: '隐藏',
                  value: 'hidden',
                },
              ]}
            />,
          ]}
          columns={columns}
          request={async () => ({
            data: defaultData,
            total: 3,
            success: true,
          })}
          value={dataSource}
          onChange={setDataSource}
          editable={{
            type: 'multiple',
            editableKeys,
            onSave: async (rowKey, data, row) => {
              console.log(rowKey, data, row);
            },
          }}
        />
        <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
          <ProFormField
            ignoreFormItem
            fieldProps={{
              style: {
                width: '100%',
              },
            }}
            mode="read"
            valueType="jsonCode"
            text={JSON.stringify(dataSource)}
          />
        </ProCard>
      </>
    );
  },
  args: {},
};

export const 可编辑表格 = {
  render: (args) => {
    const [value, onChange] = React.useState(3);
    const [data, setData] = React.useState([]);
    const ref = React.useRef();

    return (
      <div>
        <button
          onClick={() => {
            ref.current.reload();
          }}
        >
          1234
        </button>
        <EditableProTable
          {...args}
          dataSource={data}
          ref={ref}
          value={value}
          onChange={onChange}
        />
      </div>
    );
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
    columns: [
      {
        title: '活动名称',
        dataIndex: 'title',
        tooltip: '只读，使用form.getFieldValue获取不到值',
        formItemProps: (form, { rowIndex }) => {
          return {
            rules:
              rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
          };
        },
        // 第一行不允许编辑
        editable: (text, record, index) => {
          return index !== 0;
        },
        width: '15%',
      },
      {
        title: '活动名称二',
        dataIndex: 'readonly',
        tooltip: '只读，使用form.getFieldValue可以获取到值',
        readonly: true,
        width: '15%',
      },
      {
        title: '状态',
        key: 'state',
        dataIndex: 'state',
        valueType: 'select',
        valueEnum: {
          all: { text: '全部', status: 'Default' },
          open: {
            text: '未解决',
            status: 'Error',
          },
          closed: {
            text: '已解决',
            status: 'Success',
          },
        },
      },
      {
        title: '描述',
        dataIndex: 'decs',
        fieldProps: (form, { rowKey, rowIndex }) => {
          if (form.getFieldValue([rowKey || '', 'title']) === '不好玩') {
            return {
              disabled: true,
            };
          }
          if (rowIndex > 9) {
            return {
              disabled: true,
            };
          }
          return {};
        },
      },
      {
        title: '活动时间',
        dataIndex: 'created_at',
        valueType: 'date',
      },
      {
        title: '操作',
        valueType: 'option',
        width: 200,
        render: (text, record, _, action) => [
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            编辑
          </a>,
          <a
            key="delete"
            onClick={() => {
              setDataSource(dataSource.filter((item) => item.id !== record.id));
            }}
          >
            删除
          </a>,
        ],
      },
    ],
  },
};
