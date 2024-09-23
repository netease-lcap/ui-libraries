<!-- 嵌套信息 -->
<!--  可以在 Popover 中嵌套多种类型信息，以下为嵌套表格的例子。 -->
<template>
  <div>
    <el-popover placement="right" width="400" trigger="click">
      <el-table :data="gridData">
        <el-table-column
          width="150"
          property="date"
          label="日期"></el-table-column>
        <el-table-column
          width="100"
          property="name"
          label="姓名"></el-table-column>
        <el-table-column
          width="300"
          property="address"
          label="地址"></el-table-column>
      </el-table>
      <el-button slot="reference">click 激活</el-button>
    </el-popover>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
    };
  },
};
</script>
