<!-- 只读 -->
<!--  只读的评分用来展示分数，允许出现半星 -->
<template>
  <div>
    <el-rate
      v-model="value"
      disabled
      show-score
      text-color="#ff9900"
      score-template="{value}">
    </el-rate>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 3.7,
    };
  },
};
</script>
