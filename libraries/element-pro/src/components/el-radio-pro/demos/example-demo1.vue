<!-- 基础示例 -->
<template>
    <div>
      <div class="block">
        <el-radio-group-pro :value.sync="checkedValue" @change="onChange">
            <el-radio-pro value="1" allow-uncheck>选项一</el-radio-pro>
            <el-radio-pro value="2">选项二</el-radio-pro>
            <el-radio-pro value="3">选项三</el-radio-pro>
            <el-radio-pro value="4" disabled>选项四</el-radio-pro>
        </el-radio-group-pro>
        {{ checkedValue }}
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        checkedValue: '1',
      };
    },
    methods: {
        onChange(checkedValues) {
            console.log('checkedValues:', this.checkedValue, checkedValues);
        },
    },
  };
  </script>
  