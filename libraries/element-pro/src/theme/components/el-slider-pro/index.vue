<template>
  <div>
    <el-radio-group-pro v-model="layout">
      <el-radio-pro value="horizontal">水平</el-radio-pro>
      <el-radio-pro value="vertical">垂直</el-radio-pro>
    </el-radio-group-pro>
    <div class="actions-warp">
      <el-checkbox-pro v-model="disabled">是否禁用</el-checkbox-pro>
      <el-checkbox-pro v-model="showMarks">是否展示刻度</el-checkbox-pro>
    </div>
    <div :class="layout">
      <el-slider-pro v-model="value1" :show-tooltip="true" :inputNumberProps="inputNumberProps" :step="0.1"
        :layout="layout" :class="`${layout}_slider`" :disabled="disabled" :marks="showMarks ? marks1 : []" />
      <el-slider-pro v-model="value2" range :show-tooltip="true" :inputNumberProps="inputNumberProps" :layout="layout"
        :class="`${layout}_slider`" :disabled="disabled" :marks="showMarks ? marks1 : []" />
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      value1: 12,
      value2: [30, 70],
      layout: 'horizontal',
      inputNumberProps: { theme: 'column', autoWidth: true },
      disabled: false,
      showMarks: false,
      marks1: [0, 20, 40, 60, 80, 100],
      marks2: [0, 20, 40, 60, 80, 100]
    };
  },
};

</script>
<style scoped>
.actions-warp {
  display: flex;
  gap: 10px;
  margin: 10px 0 20px 0;
}

.horizontal {
  display: flex;
  flex-direction: column;
  gap: 35px;
}

.vertical {
  display: flex;
}

.vertical_slider {
  height: var(--el-slider-height);
}
</style>