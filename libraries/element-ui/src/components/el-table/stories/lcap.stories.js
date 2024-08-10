import { template } from 'lodash';
import Component from '../index';

export default {
  id: 'el-table-lcap-exmaples',
  title: '组件列表/Table 表格/扩展示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
};

const loadDataSource = [
  {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333,
    tag: '家',
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1517 弄',
    zip: 200333,
    tag: '公司',
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1519 弄',
    zip: 200333,
    tag: '家',
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1516 弄',
    zip: 200333,
    tag: '公司',
  },
]

export const Default = {
  render: () => ({
    data() {
      return {
        value: 2,
        values: [2, 3],
        showJumper: false,
        dataSource: ({ page, size, sort, order }) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              const data = [];

              for (let i = 0; i < size; i++) {
                data.push({
                  number: ((page - 1) * size) + (i + 1),
                  name: '王小虎',
                  date: '2016-05-03',
                  address: `上海市普陀区金沙江路 ${Math.round(Math.random() * 10000)} 弄`,
                });
              }
              resolve({
                list: data,
                total: 400,
              })
            }, 3000);
          })
        },
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      handleCurrentChange({ value }) {
        console.log('item', this.value)
      },
      handleSelect(e) {
        console.log(e, this.values);
      }
    },
    template: `
      <div>
        <el-button text="选择第一行" @click="values = [1]"></el-button>
        <el-button text="选择第一行" @click="showJumper = true"></el-button>
        <el-table
          :dataSource="dataSource"
          :value.sync="value"
          highlight-current-row
          :pagination="true"
          max-height="400px"
          :values.sync="values"
          @current-change="handleCurrentChange"
          valueField="number"
          :show-jumper="showJumper"
          @select="handleSelect"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column field="date" label="日期" sortable width="180">
          </el-table-column>
          <el-table-column field="name" label="姓名" sortable width="180">
          </el-table-column>
          <el-table-column field="address" label="地址" :formatter="formatter">
          </el-table-column>
        </el-table>
      </div>
    `,
  })
}
