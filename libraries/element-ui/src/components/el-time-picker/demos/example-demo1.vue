<!-- 固定时间点 -->
<!--  提供几个固定的时间点供用户选择 -->
<template>
  <div>
    <el-time-select
      v-model="value"
      :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '18:30',
      }"
      placeholder="选择时间">
    </el-time-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
    };
  },
};
</script>
