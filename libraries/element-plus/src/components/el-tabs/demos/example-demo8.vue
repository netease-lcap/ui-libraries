<template>
  <div>
    <el-tabs :dataSource="list" titleField="label" valueField="value" :modelValue="value">
      <template #label="{item}">{{item.value}}</template>
      <template #content="{ item, value }">
        {{item.label}} 选项卡内容 {{item}} {{value}}
      </template>
    </el-tabs>
  </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('tab2');
const list = ref([
  { label: '标签页1', value: 'tab1' },
  { label: '标签页2', value: 'tab2' },
  { label: '标签页3', value: 'tab3' },
]);
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
