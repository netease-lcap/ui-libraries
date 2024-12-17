import Vue from 'vue';
import * as CloudUI from '@/index.js';
import Component from '../index.js';
import ExportExcel from '../demos/examples/ExportExcel.vue';
import DemoData from '../../u-tree-view-new.vue/demos/examples/data';

Vue.use(CloudUI);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/u-table-view.vue/功能演示',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const ExportExcelDemo = {
  name: '导出表格',
  render: () => ({
    components: {
      ExportExcel,
    },
    template: '<ExportExcel />',
  }),
};

export const ExpandTree = {
  name: '展开/收起树形表格',
  render: () => ({
    data() {
      return {
        data: DemoData,
      };
    },
    methods: {
      expanedAll() {
        this.$refs.table.setAllTreeNodeExpanded(true, 2);
      },
      collaspeAll() {
        this.$refs.table.setAllTreeNodeExpanded(false, 2);
      },
      expanedItem() {
        this.$refs.table.setTreeNodeExpanded('2934079734836992', true);
      },
      collapseItem() {
        this.$refs.table.setTreeNodeExpanded('2934079734836992', false);
      },
      addRowData() {
        const pid = '3005700683213312';
        const id = Date.now();
        if (!this.idList) {
          this.idList = [];
        }

        this.idList.push(String(id));
        this.$refs.table.addRow({
          department: {
            id,
            createdTime: "2024-11-22 14:10:05",
            updatedTime: "2024-11-22 14:10:05",
            createdBy: "caizejian3",
            updatedBy: "caizejian3",
            name: "TTTT123",
            deptId: String(id),
            parentDeptId: pid,
            ancestors: null,
            organizeIds: null,
            status: '正常',
            deptTypeCode: "102_036",
            orderNum: 0,
            userNumber: 1,
            scope: null,
            agencyStatus: '是',
            level_one: null,
            level_two: null,
            level_three: null,
            level_four: null,
            level_one_deptId: null,
            level_two_deptId: null,
            level_three_deptId: null,
            level_four_deptId: null,
            fullName: "22"
          },
          expanded: false,
        }, pid);
      },
      removeRowData() {
        if (!this.idList) {
          return;
        }

        this.$refs.table.removeRow(this.idList.pop());
      },
    },
    template: `
      <div>
        <u-linear-layout gap="small">
          <u-button @click="expanedAll">展开全部</u-button>
          <u-button @click="collaspeAll">收起全部</u-button>
          <u-button @click="expanedItem">展开单个</u-button>
          <u-button @click="collapseItem">收起单个</u-button>
          <u-button @click="addRowData">添加一行</u-button>
          <u-button @click="removeRowData">删除一行</u-button>
        </u-linear-layout>
        <u-table-view ref="table" :dataSource="data" :pagination="false" :treeDisplay="true" valueField="department.deptId" parentField="department.parentDeptId">
          <u-table-view-column title="部门名称" field="department.name" width="20%"></u-table-view-column>
          <u-table-view-column title="Agency Status" field="department.agencyStatus" width="20%"></u-table-view-column>
          <u-table-view-column title="状态" field="department.status"></u-table-view-column>
          <u-table-view-column title="更新时间" field="department.updatedTime" formatter="placeholder | date" width="20%"></u-table-view-column>
        </u-table-view>
      </div>
    `,
  }),
};
