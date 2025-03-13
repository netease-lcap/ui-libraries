<!-- 基础示例 -->
<template>
    <div>
      <div class="block">
        <el-radio-group :shape="button ? 'button' : 'normal'" :value.sync="checkedValue" @change="onChange">
            <el-radio value="1" allow-uncheck>选项一</el-radio>
            <el-radio value="2">选项二</el-radio>
            <el-radio value="3">选项三</el-radio>
            <el-radio value="4" disabled>选项四</el-radio>
        </el-radio-group>
        {{ checkedValue }}
      </div>
      <el-button @click="changeStyle">change style</el-button>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        checkedValue: '1',
        button: false,
      };
    },
    methods: {
        onChange(checkedValues) {
            console.log('checkedValues:', this.checkedValue, checkedValues);
        },
        changeStyle() {
          this.button = !this.button;
        },
    },
  };
  </script>
