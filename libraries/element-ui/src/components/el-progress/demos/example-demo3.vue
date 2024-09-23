<!-- 自定义颜色 -->
<!--  可以通过 `color` 设置进度条的颜色，`color` 可以接受颜色字符串，函数和数组。 -->
<template>
  <div>
    <el-progress :percentage="percentage" :color="customColor"></el-progress>

    <el-progress
      :percentage="percentage"
      :color="customColorMethod"></el-progress>

    <el-progress :percentage="percentage" :color="customColors"></el-progress>
    <div>
      <el-button-group>
        <el-button icon="el-icon-minus" @click="decrease"></el-button>
        <el-button icon="el-icon-plus" @click="increase"></el-button>
      </el-button-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      percentage: 20,
      customColor: '#409eff',
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
      ],
    };
  },
  methods: {
    customColorMethod(percentage) {
      if (percentage < 30) {
        return '#909399';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else {
        return '#67c23a';
      }
    },
    increase() {
      this.percentage += 10;
      if (this.percentage > 100) {
        this.percentage = 100;
      }
    },
    decrease() {
      this.percentage -= 10;
      if (this.percentage < 0) {
        this.percentage = 0;
      }
    },
  },
};
</script>
