<!-- 基础用法 -->
<!--  基础的、简洁的标签页。 -->
<template>
  <div>
    <el-tabs :value.sync="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理{{ activeName }}</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理{{ activeName }}</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理{{ activeName }}</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿{{ activeName }}</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: undefined,
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
