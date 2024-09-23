<template>
  <div>
    <el-checkbox-group-pro :checkAll="true">
      <el-checkbox-pro key="1" value="1">选项一</el-checkbox-pro>
      <el-checkbox-pro key="2" value="2">选项二</el-checkbox-pro>
      <el-checkbox-pro key="3" value="3">选项三</el-checkbox-pro>
    </el-checkbox-group-pro>
    <div style="display: flex; gap: 15px;">
      <el-checkbox-pro key="4" value="4" disabled>未选中-禁用</el-checkbox-pro>
      <el-checkbox-pro key="5" value="5" checked disabled>选中-禁用</el-checkbox-pro>
      <el-checkbox-pro key="6" value="6" indeterminate disabled>不确定-禁用</el-checkbox-pro>
    </div>
  </div>
</template>