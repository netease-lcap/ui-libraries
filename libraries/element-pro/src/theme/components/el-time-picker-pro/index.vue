<template>
  <div>
    <el-checkbox-pro v-model="disabled">是否禁用</el-checkbox-pro>

    <div class="picker-warp">
      <el-time-picker-pro allowInput :disabled="disabled" />
      <el-time-range-picker-pro clearable v-model="time" format="HH:mm:ss" allowInput :disabled="disabled" />
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      disabled: false,
      time: ['00:00:00', '23:59:59'],
    }
  },
}
</script>

<style scoped>
.picker-warp {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>