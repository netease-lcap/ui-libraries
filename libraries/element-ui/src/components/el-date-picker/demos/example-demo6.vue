<!-- 默认显示日期 -->
<!--  在选择日期范围时，指定起始日期和结束日期的默认时刻。 -->
<template>
  <div>
    <div class="block">
      <p>组件值：{{ value }}</p>
      <el-date-picker
        v-model="value"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']">
      </el-date-picker>
    </div>
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
