<!-- 基础示例 -->
<template>
    <div>
      <div class="block">
        <el-checkbox-group-pro :value.sync="checkedValue" @change="onChange" :max="2">
            <el-checkbox-pro key="2" value="1">选项一</el-checkbox-pro>
            <el-checkbox-pro key="3" value="2">选项二</el-checkbox-pro>
            <el-checkbox-pro key="4" value="3">选项三</el-checkbox-pro>
            <el-checkbox-pro key="5" value="4" :disabled="true">选项四</el-checkbox-pro>
        </el-checkbox-group-pro>
        {{ checkedValue }}
      </div>
      <div class="block">
        <el-checkbox-group-pro :value.sync="checkedValue" @change="onChange" :checkAll="true">
            <el-checkbox-pro key="2" value="1">选项一</el-checkbox-pro>
            <el-checkbox-pro key="3" value="2">选项二</el-checkbox-pro>
            <el-checkbox-pro key="4" value="3">选项三</el-checkbox-pro>
            <el-checkbox-pro key="5" value="4" :disabled="true">选项四</el-checkbox-pro>
        </el-checkbox-group-pro>
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
  