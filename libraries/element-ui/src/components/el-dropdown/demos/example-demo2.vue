<!-- 触发对象 -->
<!--  可使用按钮触发下拉菜单。 -->
<template>
  <div>
    <el-dropdown>
      <el-button type="primary">
        更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown split-button type="primary" @click="handleClick">
      更多菜单
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick() {
      alert('button click');
    },
  },
};
</script>
<style>
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
