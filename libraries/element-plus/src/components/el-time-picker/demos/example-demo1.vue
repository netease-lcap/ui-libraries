<template>
  <div class="example-basic">
    <el-time-picker v-model:value="value1" placeholder="Arbitrary time" />
    <el-time-picker
      arrow-control
      placeholder="Arbitrary time"
    />
    <el-text>{{ value1 }}</el-text>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value1 = ref(`16:46:31`)
// const value2 = ref()
</script>

<style>
.example-basic .el-date-editor {
  margin: 8px;
}
</style>