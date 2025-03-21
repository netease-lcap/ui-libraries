<template>
  <div class="demo-range">
    <el-time-picker
      :start-value="value1[0]"
      :end-value="value1[1]"
      is-range
      range-separator="To"
      start-placeholder="Start time"
      end-placeholder="End time"
      format="HH时mm分ss秒"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<[string, string]>([
  '09:59:59',
  '10:00:00',
])
console.log(value1.value)
</script>

<style>
.demo-range .el-date-editor {
  margin: 8px;
}

.demo-range .el-range-separator {
  box-sizing: content-box;
}
</style>
