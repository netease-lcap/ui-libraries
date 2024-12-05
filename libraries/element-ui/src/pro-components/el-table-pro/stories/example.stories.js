import ElTablePro from '../index';

export default {
  id: 'el-table-pro-examples',
  title: 'Pro组件列表/Table 表格/示例',
  component: ElTablePro,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
};

export const Default = {
  name: '基础示例',
  render: () => ({
    // moud
    async mounted() {
      setTimeout(() => {
        this.hasExpandedRow = false;
        console.log(123);
      }, 3000);
    },
    watch: {
      selectedRowKeys(value) {
        console.log(value, '===watch');
      },
    },
    data() {
      return {
        data: async (params) => {
          const initialData = [];
          const total = 200;
          for (let i = 0; i < total; i++) {
            initialData.push({
              index: i,
              applicant: ['贾明', '张三', '王芳'][i % 3],
              status: i % 3,
              channel: ['电子签署', '电子签署', '纸质签署'][i % 3],
              children: [
                {
                  channel: ['电子签署', '电子签署', '纸质签署'][i % 3],
                },
              ],
              detail: {
                email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
              },
              matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
              time: [2, 10, 1][i % 3],
              createTime: ['2022-01-01', '2022-02-01', '2022-02-01', '2022-03-01', '2022-04-01'][i % 4],
            });
          }

          return {
            list: initialData,
            total,
          };
        },
        hasExpandedRow: true,
        list: [],
        rowspan: 2,
        type: undefined,
        selectedRowKeys: [],
        columns: [
          { colKey: 'applicant', title: '申请人', width: 100 },
          { colKey: 'status', title: '状态', width: 100 },
          { colKey: 'channel', title: '渠道', width: 100 },
          { colKey: 'detail.email', title: '邮箱', width: 100 },
          { colKey: 'matters', title: '事项', width: 100 },
          { colKey: 'time', title: '时长', width: 100 },
          { colKey: 'createTime', title: '创建时间', width: 100 },
        ],
      };
    },
    methods: {
      log(value) {
        console.log(value);
      },
      onSortChange(...arg) {
        console.log(arg, 'arg===');
      },
      onDragSortChange(...arg) {
        console.log(arg, 'arg===');
      },
      rowspanAndColspan({
        row, col, rowIndex, colIndex,
      }) {
        // console.log(rowIndex,'rowIndex`');
        // if (colIndex == 1 && rowIndex % this.rowspan == 0) {
        //   return {
        //     rowspan: this.rowspan,
        //   };
        // }
        // return {};
        if (row?.rowspan?.[col.colKey] > 1) {
          return {
            rowspan: row.rowspan[col.colKey],
          };
        }
        // console.log('object2');
        return {};
      },
    },
    template: `<el-table-pro
    row-key="index"
   :dataSource="data"
   :rowspanAndColspan="rowspanAndColspan"
   :selectedRowKeys.sync="selectedRowKeys"
   @sort-change="onSortChange"
   :onRowClick="log"
   dragSort="row"
   :treeDisplay="true"
   :selection="true"
   :multiple="false"
   :onDragSort="onDragSortChange"
    >

    <el-table-column-pro title="申请人" >
    <template #cell="cell">
      <div>{{'12'}}</div>
    </template>
    </el-table-column-pro>

        <el-table-column-pro title="渠道" colKey="channel" :sorter="true" :autoMerge="true" >
    <template #cell="cell">
      <div>{{ cell.item.channel }}</div>
    </template>
    </el-table-column-pro>

    <el-table-column-pro title="渠道" colKey="createTime" width="300" > </el-table-column-pro>

    <template #expanded-row="{ item }">
      <div class="more-detail">
        <p class="title"><b>集群名称:</b></p><p class="content">{{item.channel}}</p><br/>
      </div>
    </template>
    </el-table-pro>`,
  }),
};
// <el-table-column-pro data-nodepath="123"  >
//   <template #title="title">
//      <div>
//      <div>1234</div>
//      </div>
//  </template>
//   <template #cell="cell">
//       <div>
//           <div>{{ cell.row.applicant }}</div>
//      </div>
//    </template>
// </el-table-column-pro>
