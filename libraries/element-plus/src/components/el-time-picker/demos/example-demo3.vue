<template>
  <div class="demo-range">
    <el-time-picker
      :startValue.sync="startValue"
      :endValue.sync="endValue"
      @sync:state="handleSyncState"
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

const startValue = ref<string>('09:59:59')
const endValue = ref<string>('10:00:00')

const handleSyncState = (name, value) => {
  console.log(name, value)
}
// console.log(startValue.value, endValue.value)
</script>

<style>
.demo-range .el-date-editor {
  margin: 8px;
}

.demo-range .el-range-separator {
  box-sizing: content-box;
}
</style>
