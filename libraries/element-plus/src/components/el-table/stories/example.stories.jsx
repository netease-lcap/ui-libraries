/** @jsx h */
import { ref, watch, computed, h, getCurrentInstance } from 'vue';
import { ElPagination } from 'element-plus';
import _ from 'lodash';
import { ElTable, ElTableColumn, ElTableColumnDynamic } from '../../index';

import { transformKeys } from '../../../utils';

import Component from '../index';

export default {
  id: 'el-table-examples',
  title: '组件列表/Table 数据表格/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  基础的、简洁的标签页。 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    setup() {
      const activeName = ref('first');
      const tableData = async (page) => {
        const arr = [
          {
            date: '2016-05-03',
            name: 'Tom',
            six: {
              name: '132',
            },
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-08',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-06',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-07',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-03',
            name: 'Tom',
            six: {
              name: '132',
            },
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-08',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-06',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-07',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
        ];
        // return arr
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ list: arr, total: arr.length });
          }, 1000);
        });
      };
      const tableData2 = ref([
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ]);
      const width = ref('501px');
      const mytable = ref();
      const currentPage = ref(1);
      const pageSize2 = ref(5);
      const selectedRowKeys = ref([
        {
          date: '2016-05-07',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ]);

      watch(selectedRowKeys, (el) => {
        console.log(el, 'log');
      });
      setTimeout(() => {
        console.log('table data change');
        tableData2.value.splice(0, 1);
        console.log(tableData2, 'tableData2');
      }, 1000);
      const logCellClick = (...el) => {
        console.log(tableData2.value, 'logCellClick');
      };
      const cellStyle = (value) => {
        console.log(value, '==value');
        return {};
      };
      return {
        tableData,
        tableData2,
        pageSize2,
        currentPage,
        mytable,
        selectedRowKeys,
        cellStyle,
        logCellClick,
      };
    },
    template: `
    <el-flex style="border: 1px solid red;">
<el-table
ref="mytable"
row-key="date"
:dataSource="tableData"
border
style="height:500px"
min-height="500px"
v-model:currentPage="currentPage"
:showTotal="true"
@selection-change="logCellClick"
field="six.name"
order="descending"
:sorting="{ field: 'six.name', order: 'desc' }"
:showJumper="true"
pageSizes="[5,10,20,50]"
:defaultPageSize="10"
:pagination="false"
:stripe="true"
>



    <el-table-column prop="name" width="30%" type="expand"  class="myclomuns" :style="{'text-align':'left'}" >
    <template #header>
    <el-text>text-Name</el-text>
    </template>
    </el-table-column>
    <el-table-column-plus prop="date" label="Name" class="myclomuns" :style="{'text-align':'left'}" />


</el-table>
    </el-flex>
    `,
  }),
};

/*  基础的、简洁的标签页。主题 demo 勿动 */
export const Example2 = {
  name: '示例2',
  render: () => ({
    setup() {
      const activeName = ref('first');
      const total = 28;
      const tableData = async (pageObj) => {
        console.log(pageObj, 'pagerequest====');
        const initialData = [];
        for (
          let i = (pageObj.currentPage - 1) * pageObj.pageSize;
          i < pageObj.currentPage * pageObj.pageSize && i < total;
          i++
        ) {
          initialData.push({
            index: i + 1,
            applicant: ['贾明', '张三', '王芳'][i % 3],
            status: i % 3,
            channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
            email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
            matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
            time: [2, 3, 1, 4][i % 4],
            createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
            applyTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
            modifyTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
            confirmTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
          });
        }
        return initialData;
      };
      const mytable = ref();
      const currentPage = ref(1);
      const pageSize2 = ref(10);
      const selectedRowKeys = ref([
        {
          index: 4,
        },
      ]);

      watch(selectedRowKeys, (el) => {
        console.log(el, 'log');
      });
      // setTimeout(() => {
      //   console.log(selectedRowKeys,'selectedRowKeys');
      // }, 1000);
      return {
        tableData,
        pageSize2,
        currentPage,

        mytable,
        selectedRowKeys,
      };
    },
    template: `
    
<el-table
:ref="'affddd'"
row-key="index"
:dataSource="tableData"
:pagination="true"
v-model:currentPage="currentPage"
v-model:pageSize="pageSize2"
:showTotal="true"
:total="total"
:sorting="{ field: 'createTime', order: 'desc' }"
:showJumper="true"
:pageSizes="[10, 100, 200, 300, 400]"
v-model:selectedRowKeys="selectedRowKeys"
@sort-change="onSortChange"
dragSort="row"
:selection="true"
  bordered
  hover
  stripe
  showHeader
  size=small"
>
  <el-table-column prop="applicant" label="申请人" width="100" fixedPosition="left"></el-table-column>
  <el-table-column prop="status" label="申请状态" width="150" sorter></el-table-column>
  <el-table-column prop="channel" label="签署方式" width="200"></el-table-column>
  <el-table-column prop="email" label="邮箱地址" width="200" ellipsis></el-table-column>
  <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
  <el-table-column prop="applyTime" label="申请时间" width="160"></el-table-column>
  <el-table-column prop="modifyTime" label="修改时间" width="160"></el-table-column>
  <el-table-column prop="confirmTime" label="确认时间" width="160"></el-table-column>
</el-table>
    `,
  }),
};
export const Default = {
  name: '动态列',
  render: (args, { parameters }) => ({
    setup() {
      const { globalConfig } = parameters;
      const tableData = globalConfig.asyncData();
      const columns = async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                prop: 'email',
                label: '邮件',
              },
              {
                prop: 'modifyTime',
                label: '修改时间',
              },
            ]);
          }, 1000);
        });
      };
      const object = { a: 1, b: '2', c: 3 };
      return () => {
        return (
          <ElTable dataSource={tableData}>
            <ElTableColumn prop="label" label="index" />
            <ElTableColumnDynamic dataSource={columns}>
              {{
                header: (item) => {
                  return <div>{item.item.label}</div>;
                },
                default: (current) => {
                  return <div>{current.item[current.columnItem.prop]}</div>;
                },
              }}
            </ElTableColumnDynamic>
            <ElTableColumn prop="createTime" label="index" />
          </ElTable>
        );
      };
    },
  }),
};

export const Example3 = {
  name: '示例3',
  render: () => ({
    setup() {
      const activeName = ref('first');
      const total = 28;
      const tableData = async (pageObj) => {
        console.log(pageObj, 'pagerequest====');
        const initialData = [];
        for (
          let i = (pageObj.currentPage - 1) * pageObj.pageSize;
          i < pageObj.currentPage * pageObj.pageSize && i < total;
          i++
        ) {
          initialData.push({
            index: i + 1,
            applicant: ['贾明', '张三', '王芳'][i % 3],
            status: i % 3,
            channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
            email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
            matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
            time: [2, 3, 1, 4][i % 4],
            createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
            applyTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
            modifyTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
            confirmTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
          });
        }
        return initialData;
      };
      const mytable = ref();
      const currentPage = ref(1);
      const pageSize2 = ref(10);
      const selectedRowKeys = ref([
        {
          index: 4,
        },
      ]);

      watch(selectedRowKeys, (el) => {
        console.log(el, 'log');
      });

      const currentRowKey = ref([1, 2]);
      const tableRef = ref();
      setTimeout(() => {
        currentRowKey.value = [1, 2, 3, 4];
        // tableRef.value.reload();
        console.log(123);
      }, 3000);
      const data = getTestData();
      const selectedValue = ref(1);
      return {
        testData: getTestData(),
        getTestData,
        data,
        tableRef,
        currentRowKey,
        selectedValue,
        objectSpanMethod({ rowIndex, columnIndex }) {
          if (columnIndex === 0) {
            if (rowIndex % 2 === 0) {
              return {
                rowspan: 2,
                colspan: 1,
              };
            }
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
          return {};
        },
        handleCurrentChange(val) {
          console.log(val, 'val');

          selectedValue.value += 1;
        },
        handleCurrentChange2() {
          // console.log(tableRef.value.context.store.setCurrentRowKey('1'),'tableRef');
          // console.log(tableRef.value.context.store.setCurrentRowKey('1'),'tableRef');
          // console.log(tableRef, 'object');
          console.log(currentRowKey);
          // currentRowKey.value = _.sample([[1], [2], [3], [4]]);
          currentRowKey.value = [1, 2, 3, 4];
          // tableRef.value.store.setCurrentRowKey('1');
          // tableRef.value.
        },
      };
    },
    template: `
    
    <div>
    {{currentRowKey}}
    'value'
    {{selectedValue}}
         <el-table
          :dataSource="getTestData"
          ref="tableRef"
          row-key="hd.id"
          v-model:selectedValues="currentRowKey"
          border
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column-plus prop="id" label="ID" width="180" type="selection" />
          <el-table-column-plus prop="name" label="片名" />
          <el-table-column-plus prop="release" label="发行日期" />
          <el-table-column-plus prop="director" label="导演" />
          <el-table-column-plus prop="runtime" label="时长（分）" />
        </el-table>
        <button @click="handleCurrentChange2(1)">1</button>
        <button @click="handleCurrentChange(1)">1</button>
    </div>
    `,
  }),
};

export const Example4 = {
  name: '示例4',
  render: (args, { parameters }) => ({
    data() {
      const { globalConfig } = parameters;
      const tableData = globalConfig.asyncData();
      function getTestData() {
        return [
          {
            id: 1,
            hd: {
              id: 1,
            },
            name: 'Toy Story',
            release: '1995-11-22',
            director: 'John Lasseter',
            runtime: 80,
          },
          {
            hd: {
              id: 2,
            },
            id: 2,
            name: "A Bug's Life",
            release: '1998-11-25',
            director: 'John Lasseter',
            runtime: 95,
          },
          {
            hd: {
              id: 3,
            },
            id: 3,
            name: 'Toy Story 2',
            release: '1999-11-24',
            director: 'John Lasseter',
            runtime: 92,
          },
          {
            id: 4,
            hd: {
              id: 4,
            },
            name: 'Monsters, Inc.',
            release: '2001-11-2',
            director: 'Peter Docter',
            runtime: 92,
          },
          {
            hd: {
              id: 5,
            },
            id: 5,
            name: 'Finding Nemo',
            release: '2003-5-30',
            director: 'Andrew Stanton',
            runtime: 100,
          },
        ];
      }
      const treeProps = {
        children: 'childrenTest',
        checkStrictly: false,
      };
      const testData = getTestData();
      testData[1].childrenTest = [
        {
          id: 21,
          name: "A Bug's Life copy 1",
          release: '1998-11-25-1',
          director: 'John Lasseter',
          runtime: 95,
        },
        {
          id: 22,
          name: "A Bug's Life copy 2",
          release: '1998-11-25-2',
          director: 'John Lasseter',
          runtime: 95,
        },
      ];

      return {
        treeProps,
        testData,
        tableData,
        selected: [],
      };
    },

    methods: {
      change(rows) {
        this.selected = rows;
        console.log(this, 'current');
      },
    },
    template: `
    <el-table :data="testData" :tree-props="treeProps" row-key="id" @selection-change="change">
              <el-table-column type="selection" />
              <el-table-column prop="name" label="name" />
              <el-table-column prop="release" label="release" />
              <el-table-column prop="director" label="director" />
              <el-table-column type="editable" prop="runtime" label="runtime" >
                <template #default="{ row }">
                    <el-form-select  v-model:modelValue="row.runtime" :rules="[]" :preview="(row || {}).isPreview" v-dependencies.reload="[]" :dataSource="tableData" textField="" valueField="" descriptionField="">
                    <el-option :value="true" label="是" title="">
                        <el-text : text="是"></el-text>
                    </el-option>
                    <el-option :value="false" label="否">
                        <el-text :text="否"></el-text>
                    </el-option>
                    </el-form-select>
                </template>
              </el-table-column>
            </el-table>
`,
  }),
};
