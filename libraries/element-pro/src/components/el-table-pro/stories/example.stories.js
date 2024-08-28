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
    data() {
      return {
        data: async (params) => {
          console.log(params, 'params');
          const initialData = [];
          const total = 50;
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
        data:[],
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
    },
    template: `<el-table-pro
    row-key="index"
   
    >
      <el-table-column-pro data-nodepath="123"  >
        <template #title="title">
           <div>
           <div>1234</div>
           </div>
       </template>
        <template #cell="cell">
            <div>
                <div>{{ cell.row.applicant }}</div>
           </div>
         </template>
      </el-table-column-pro>
   
    </el-table-pro>`,
  }),
};

{
  /* <el-table-pro data-nodepath="d079a192f0ba416e9f433d4be788a3e7" rowKey="index" key="component-d079a192f0ba416e9f433d4be788a3e7"  >
  <el-table-column-pro data-nodepath="9c600b5879f6417d86e78fc6613e4543" key="component-9c600b5879f6417d86e78fc6613e4543"  >
    <template #cell={...argus}>
        <div data-nodepath="3fba2258c3a34805b4b4a6dd561ec98d"  ><EmptySlot data-emptyslot-nodepath="3fba2258c3a34805b4b4a6dd561ec98d"  ></EmptySlot></div>
    </template>
    <template slot="title">
    <div data-nodepath="d5d527546e074a2584fcdd0ecd4a4487"  >
      <EmptySlot data-emptyslot-nodepath="d5d527546e074a2584fcdd0ecd4a4487"  ></EmptySlot>
      </div>
    </template>
    </el-table-column-pro>
</el-table-pro> */
}
