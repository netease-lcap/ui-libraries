<template>
  <div>
    <el-radio-group-pro v-model="size">
      <el-radio-pro value="small">小尺寸</el-radio-pro>
      <el-radio-pro value="medium">中尺寸</el-radio-pro>
      <el-radio-pro value="large">大尺寸</el-radio-pro>
    </el-radio-group-pro>
    <div class="actions-warp">
      <el-checkbox-pro v-model="enableTimePicker">是否可选择时间</el-checkbox-pro>
      <el-select-pro v-model="mode" label="模式：">
        <el-option-pro label="日期" value="date"></el-option-pro>
        <el-option-pro label="周" value="week"></el-option-pro>
        <el-option-pro label="月" value="month"></el-option-pro>
        <el-option-pro label="季度" value="quarter"></el-option-pro>
        <el-option-pro label="年" value="year"></el-option-pro>
      </el-select-pro>
    </div>

    <div class="picker-warp">
      <el-date-picker-pro :mode="mode" :enableTimePicker="enableTimePicker" :size="size" />

      <el-date-range-picker-pro :mode="mode" :enableTimePicker="enableTimePicker" :size="size" :presets="presets" />
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      size: 'medium',
      enableTimePicker: false,
      mode: 'date',
      presets: {
        最近7天: [new Date(+new Date() - 86400000 * 6), new Date()],
        最近3天: [new Date(+new Date() - 86400000 * 2), new Date()],
        今天: [new Date(), new Date()],
      },
    }
  },
}
</script>

<style scoped>
.actions-warp {
  font-size: 12px;
  margin: 10px 0 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.picker-warp {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>