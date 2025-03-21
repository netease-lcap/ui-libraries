<template>
  <div class="example-basic">
    <el-time-picker
      :start-value="value1[0]"
      :end-value="value1[1]"
      @change="change"
      is-range
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
      placeholder="Arbitrary time"
    />
    <el-text>{{ value1 }}</el-text>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<[string, string]>([
  '09:59:59',
  '10:00:00',
])

const change = (val) => {
  console.log(val);
}

const makeRange = (start: number, end: number) => {
  const result: number[] = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}
const disabledHours = (role: string) => {
  console.log(role)
  return makeRange(0, 2).concat(makeRange(19, 23))
}
const disabledMinutes = (hour: number) => {
  if (hour === 17) {
    return makeRange(0, 29)
  }
  if (hour === 18) {
    return makeRange(31, 59)
  }
}
const disabledSeconds = (hour: number, minute: number) => {
  if (hour === 18 && minute === 30) {
    return makeRange(1, 59)
  }
}
</script>

<style>
.example-basic .el-date-editor {
  margin: 8px;
}
</style>
