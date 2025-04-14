<template>
  <div>
    <el-text v-popover="popoverRef" v-click-outside="onClickOutside">
      Click me
    </el-text>

    <el-popover
      ref="popoverRef"
      trigger="click"
      title="With title"
      virtual-triggering
      persistent
    >
      <span> Some content </span>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'

const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
</script>
