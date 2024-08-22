<!-- 基础示例 -->
<template>
    <div>
      <div class="block">
        <el-checkbox-group-pro :value.sync="checkedValue" @change="onChange">
            <el-checkbox-pro value="1">选项一</el-checkbox-pro>
            <el-checkbox-pro value="2">选项二</el-checkbox-pro>
            <el-checkbox-pro value="3">选项三</el-checkbox-pro>
            <el-checkbox-pro value="4" disabled>选项四</el-checkbox-pro>
        </el-checkbox-group-pro>
        {{ checkedValue }}
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        checkedValue: ['1'],
      };
    },
    methods: {
        onChange(checkedValues) {
            console.log('checkedValues:', this.checkedValue, checkedValues);
        },
    },
  };
  </script>
  