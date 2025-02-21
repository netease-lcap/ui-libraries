import { ref, watch } from 'vue';
import { ElPagination } from 'element-plus';
import _ from 'lodash';
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
        console.log(page, 'pagerequest====');
        return [
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
      };
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
        width.value = '1000px';
        console.log('object');
      }, 1000);
      const logCellClick = (el) => {
        console.log(el, 'logCellClick');
      };
      return {
        tableData,
        pageSize2,
        currentPage,
        mytable,
        selectedRowKeys,
        width,
        logCellClick,
      };
    },
    template: `
<el-table
ref="mytable"
row-key="name"
:dataSource="tableData"
:pagination="true"
v-model:currentPage="currentPage"
v-model:pageSize="pageSize2"
:showTotal="true"
height=""
:style="{'width':width}"
@selection-change="logCellClick"
:sorting="{ field: 'six.name', order: 'desc' }"
:showJumper="true"
:pageSizes="[10,100, 200, 300, 400]"
data-nodepath="1234"
v-model:selectedRowKeys="selectedRowKeys"
@sort-change="onSortChange"
dragSort="row"
:selection="true"
:stripe="true"
@cellClick="logCellClick"
>

<el-table-column label="申请人"  type="selection">
  <div>123</div>
</el-table-column>

    <el-table-column title="渠道" colKey="channel" :sorter="true" :autoMerge="true" >
<template #cell="cell">
  <div>{{ cell.item.channel }}</div>
</template>
</el-table-column>

    <el-table-column prop="six.name" label="Date" sortable="custom" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column type="normal" prop="address" label="Address" />

<template #expanded-row="{ item }">
  <div class="more-detail">
    <p class="title"><b>集群名称:</b></p><p class="content">{{item.channel}}</p><br/>
  </div>
</template>
</el-table>
    `,
  }),
};

/*  基础的、简洁的标签页。 */
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
ref="mytable"
row-key="index"
:dataSource="tableData"
:pagination="true"
v-model:currentPage="currentPage"
v-model:pageSize="pageSize2"
:showTotal="true"
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
  name: '基础翻页',
  render: () => ({
    setup() {
      const value = ref(2);
      const object = { a: 1, b: '2', c: 3 };

      _.pickBy(object, (value, key) => {
        console.log(value, key,'`==============');
        return _.isNumber(value);
      });
      return {
        value,
      };
    },
    template: `
  <el-table style="--el-table-border-color: #e10910; color:red" :pagination="true" :pageSize="20" data-nodepath="a55ba3783cb146a881ae5d54e594612b" key="component-a55ba3783cb146a881ae5d54e594612b" :dataSource="[{index:0},{index:1},{index:2}]"  rowKey="index" valueField="index"  >
      <el-table-column data-nodepath="da0514a35d184c4aa1289d08aa8269f9" data-nodepath-multiple="true" dataNodepathMultiple="ture" key="component-da0514a35d184c4aa1289d08aa8269f9"  >
      <template #default={...argus}>
      </template>
      <template #header={...argus}>
          <div data-nodepath="554d8ebb9b9940d7af8d8bd25f460bb8"  >
            <el-text data-nodepath="9dc4874002ca4d9ab0a0b32d3411599a" text="表格列" key="component-9dc4874002ca4d9ab0a0b32d3411599a" data-editable="true"  >
            </el-text>
          </div>
      </template>
      </el-table-column>
    </el-table>
    `,
  }),
};
