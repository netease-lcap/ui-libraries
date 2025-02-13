import { ref, watch } from 'vue';
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
      const mytable = ref();
      const currentPage = ref(1);
      const pageSize2 = ref(10);
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
row-key="name"
:dataSource="tableData"
:pagination="true"
v-model:currentPage="currentPage"
v-model:pageSize="pageSize2"
:showTotal="true"
:sorting="{ field: 'six.name', order: 'desc' }"
:showJumper="true"
:pageSizes="[10,100, 200, 300, 400]"
v-model:selectedRowKeys="selectedRowKeys"
@sort-change="onSortChange"
dragSort="row"
:selection="true"
>

<el-table-column label="申请人" >

</el-table-column>

    <el-table-column title="渠道" colKey="channel" :sorter="true" :autoMerge="true" >
<template #cell="cell">
  <div>{{ cell.item.channel }}</div>
</template>
</el-table-column>

    <el-table-column prop="six.name" label="Date" sortable="custom" width="180" />
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
    setup() {
      const value = ref(2);
      return {
        value,
      };
    },
    template: `
      <el-pagination :currentPage="value"   @update:currentPage="value = $event" layout="prev, pager, next,total" :total='50'>
      </el-pagination>
    `,
  }),
};
