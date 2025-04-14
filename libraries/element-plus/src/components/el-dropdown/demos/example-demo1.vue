<!-- 基础用法 -->
<!--  移动到下拉菜单上，展开更多操作。 -->
<template>
  <div>
    <el-dropdown
      type="primary"
      :splitButton="true"
      :dataSource="sourceFunc"
      textField="text"
      valueField="value"
      disabledField="disabled"
      dividedField="divided"
      @command="handleCommand">
      <template #default>
        <el-text text="下拉菜单"></el-text>
      </template>
      <template #items>
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand(value){
      console.log('click',value);
    },
    sourceFunc() {
      return [
        {
          text: '选项1',
          value: 1,
          disabled: true,
        },
        {
          text: '选项2',
          value: 2,
          icon: 'back',
        },
        {
          text: '选项3',
          value: 3,
          divided: true,
        },
      ];
    },
  },
};
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
