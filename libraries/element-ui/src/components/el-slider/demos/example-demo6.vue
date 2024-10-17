<!-- 展示标记 -->
<!--  -->
<template>
  <div>
    <div class="block">
      <el-slider v-model="value" range :marks="marks"> </el-slider>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [30, 60],
      marks: {
        0: '0°C',
        8: '8°C',
        37: '37°C',
        50: {
          style: {
            color: '#1989FA',
          },
          label: this.$createElement('strong', '50%'),
        },
      },
    };
  },
};
</script>
