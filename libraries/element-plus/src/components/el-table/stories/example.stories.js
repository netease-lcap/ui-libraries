import { ref, watch, computed } from 'vue';
import { ElPagination } from 'element-plus';
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// import zhCn from 'element-plus/es/locale/lang/zh-cn';
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// import en from 'element-plus/dist/locale/en.mjs';

import _ from 'lodash';
// import i18n from '../../../../dist-theme/i18n.json';
import { transformKeys } from '@/utils';

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
        return { list: arr, total: arr.length };
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
        width.value = '1000px';
        console.log('object');
      }, 1000);
      const logCellClick = (...el) => {
        console.log(el, 'logCellClick');
      };
      return {
        tableData,
        tableData2,
        pageSize2,
        currentPage,
        mytable,
        selectedRowKeys,
        width,
        logCellClick,
      };
    },
    template: `
    <el-flex style="border: 1px solid red;">
<el-table
ref="mytable"
row-key="id"
:dataSource="tableData2"
style="width: 100%;"
v-model:currentPage="currentPage"
:showTotal="true"
height=""
@selection-change="logCellClick"
field="six.name"
order="descending"
:sorting="{ field: 'six.name', order: 'desc' }"
:showJumper="true"
pageSizes="[5,10,20,50]"
:defaultPageSize="10"
data-nodepath="1234"
v-model:selectedRowKeys="selectedRowKeys"
dragSort="row"
:pagination="false"
:selection="true"
:stripe="true"
>

<el-table-column label="申请人"  style="color:red"  sortable>
  <div>123</div>
</el-table-column>

    <el-table-column label="渠道" prop="address"  >
        <template #default="current">
          <div>{{current.item.address}}</div>
          <el-input v-model="current.item.address" />
        </template>
    </el-table-column>

    <el-table-column prop="six.name" label="Date" sortable="none" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column type="normal" prop="address" label="Address" />


</el-table>
    </el-flex>
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
      const tableData = async (pageObj = { currentPage: 1, pageSize: 20 }) => {
        console.log(pageObj, 'pagerequest====');
        const initialData = [];
        for (let i = 0; i < total; i++) {
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
      setTimeout(() => {
        console.log(mytable, 'mytable====');
      }, 1000);
      const logCellClick = (el) => {
        console.log(el, 'el');
        // console.log(mytable.value.reload(), 'logCellClick');
      };
      const config = {
        round: true,
      };
      const dataSource = async () => {
        return [
         
        ];
      };

      return {
        tableData,
        pageSize2,
        currentPage,
        mytable,
        selectedRowKeys,
        logCellClick,
        config,
        transformKeys,
        dataSource,
      };
    },
    template: `
    <config-provider  :button="config">
<el-table
ref="mytable"
row-key="index"
class="my-table"
:dataSource="tableData"
:pagination="true"
:showTotal="true"
:sorting="{ field: 'createTime', order: 'desc' }"

:showJumper="true"
:columnConfig="true"
:editTable="true"
:pageSizes="[10, 100, 200, 300, 400]"
v-model:selectedRowKeys="selectedRowKeys"
@sort-change="onSortChange"
@selection-change="logCellClick"
dragSort="row"
:selection="true"
  :border="true"
  hover
  stripe
  showHeader
  size=small"
>
  <el-table-column prop="index" type="selection" width="55" />
  <el-table-column prop="status" label="申请状态" width="350">
  <template #header>
    <div>申请状态</div>
  </template>
  <template #default="current">
    <div>{{current.item.status}}</div>
  </template>

  </el-table-column>
  <el-table-column  label="签署方式">
  </el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
    <el-table-column prop="applyTime" label="申请时间" width="160"></el-table-column>
  <el-table-column prop="email" label="邮箱地址" width="200" ellipsis></el-table-column>
  <el-table-column prop="modifyTime" label="修改时间" width="160"></el-table-column>
  <el-table-column prop="confirmTime" label="确认时间" width="160"></el-table-column>
</el-table>
<el-pagination  :total="100" />
      <el-button >中文</el-button>
</config-provider>
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
        console.log(value, key, '`==============');
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
