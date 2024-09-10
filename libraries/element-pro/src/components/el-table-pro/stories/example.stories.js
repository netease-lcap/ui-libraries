import ElTablePro from '../index';

export default {
  id: 'el-table-pro-examples',
  title: '组件列表/Table 表格/示例',
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
        this.type = 'multiple';
        this.selectedRowKeys.push(1);
        console.log('=====watch');
      }, 3000);
      this.list = await this.data();
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
          const total = 5;
          for (let i = 0; i < total; i++) {
            initialData.push({
              index: i,
              applicant: ['贾明', '张三', '王芳'][i % 3],
              status: i % 3,
              channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
              detail: {
                email: [
                  'w.cezkdudy@lhll.au',
                  'r.nmgw@peurezgn.sl',
                  'p.cumx@rampblpa.ru',
                ][i % 3],
              },
              matters: [
                '宣传物料制作费用',
                'algolia 服务报销',
                '相关周边制作费',
                '激励奖品快递费',
              ][i % 4],
              time: [2, 10, 1][i % 3],
              createTime: [
                '2022-01-01',
                '2022-02-01',
                '2022-03-01',
                '2022-04-01',
                '2022-05-01',
              ][i % 4],
            });
          }
          return {
            list: initialData,
            total,
          };
        },
        list: [],
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
    },
    template: `<el-table-pro
    row-key="index"
   :dataSource="data"
   :selectedRowKeys.sync="selectedRowKeys"
   @sort-change="onSortChange"
    >

    <el-table-column-pro title="申请人"  colKey="channel"   :sorter="true"  fixed= 'left'   :width="500">
    <template #cell="cell">
      <div>{{selectedRowKeys}}</div>
    </template>
    </el-table-column-pro>

    
    <el-table-column-pro title="渠道" colKey="channel"  :width="500" :sorter="true" fixed= 'left'>
      <template #cell="cell">
        <div>{{ cell.item.channel }}</div>
      </template>
    </el-table-column-pro>
        <el-table-column-pro title="渠道" colKey="channel"  :width="500" :sorter="true" fixed= 'left' >
    <template #cell="cell">
      <div>{{ cell.item.channel }}</div>
    </template>
    </el-table-column-pro>

     <el-table-column-pro title="渠道" colKey="channel"  :width="500" :sorter="true" fixed= 'left' >
      <template #cell="cell">
        <div>{{ cell.item.channel }}</div>
      </template>
    </el-table-column-pro>


    <el-table-column-pro title="渠道" colKey="channel"  :width="500" :sorter="true" fixed= 'left' >
    <template #cell="cell">
      <div>{{ cell.item.channel }}</div>
    </template>
    </el-table-column-pro>


    <el-table-column-pro title="渠道" colKey="channel"  :width="500" :sorter="true" fixed= 'left' >
    <template #cell="cell">
      <div>{{ cell.item.channel }}</div>
    </template>
    </el-table-column-pro>

        <el-table-column-pro title="渠道" colKey="channel" :sorter="true" >
    <template #cell="cell">
      <div>{{ cell.item.channel }}</div>
    </template>
    </el-table-column-pro>
   
    <el-table-column-pro title="渠道" colKey="time1" width="300">
    </el-table-column-pro>
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
