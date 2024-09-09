<template>
<div>
  <div>值:  <input v-model="value" type="number"></input></div>
  <div>精度： <input v-model="precision" type="number"></input></div>

  <el-statistic
    group-separator=","
    decimal-separator="."
    :precision="Number(precision)"
    :value="Number(value)"
    :title="title">
  </el-statistic>
</div>
</template>
<script>
export default {
  data() {
    return {
      value: 4154,
      precision: 2,
      title: '测试精度',
    };
  },
};
</script>
