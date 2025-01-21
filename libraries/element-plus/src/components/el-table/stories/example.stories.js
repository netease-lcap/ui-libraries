import { ref } from 'vue';
import { ElPagination } from 'element-plus';
import Component from '../index';

export default {
  id: 'el-table-examples',
  title: '组件列表/table 输入框/示例',
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
      const tableData = [
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
      const currentPage = ref(2);
      return {
        tableData,
        currentPage,
      };
    },
    template: `
<el-table
row-key="index"
:data="tableData"
v-model:current-page="currentPage"
:rowspanAndColspan="rowspanAndColspan"
:selectedRowKeys.sync="selectedRowKeys"
@sort-change="onSortChange"
dragSort="row"
:selection="true"
:multiple="false"
>

<el-table-column label="申请人" >
<template #default="cell">
  <div>{{'12'}}</div>
</template>
</el-table-column>

    <el-table-column title="渠道" colKey="channel" :sorter="true" :autoMerge="true" >
<template #cell="cell">
  <div>{{ cell.item.channel }}</div>
</template>
</el-table-column>

    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />

<template #expanded-row="{ item }">
  <div class="more-detail">
    <p class="title"><b>集群名称:</b></p><p class="content">{{item.channel}}</p><br/>
  </div>
</template>
</el-table>
    `,
  }),
};

export const Default = {
  name: '基础翻页',
  render: () => ({
    template: `
      <el-pagination :current-page="3" layout="prev, pager, next,total" :total='50'>
      </el-pagination>
    `,
  }),
};
