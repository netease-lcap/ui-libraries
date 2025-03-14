<!-- 分栏偏移 -->
<!--  支持偏移指定的栏数。 -->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6" :offset="6"
        ><div class="grid-content bg-purple"></div
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="6"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="6" :offset="6"
        ><div class="grid-content bg-purple"></div
      ></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6"
        ><div class="grid-content bg-purple"></div
      ></el-col>
    </el-row>
  </div>
</template>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
