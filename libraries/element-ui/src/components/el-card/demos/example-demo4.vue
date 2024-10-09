<!-- 简单卡片 -->
<!--  卡片可以只有内容区域。 -->
<template>
  <div>
    <el-card class="box-card" ref="card">
      <el-input :value.sync="value" @input="(el) => value = el"></el-input>
      <el-button @click="add">变</el-button>
      <el-button @click="addd">变2</el-button>
      <el-button @click="logg">get</el-button>
    </el-card>
  </div>
</template>
<script>
export default {
  methods: {
    add(value) {
      // console.log(this.$refs.card.valueChange(12));
      this.value = 333
    },
    addd(value) {
      console.log(this.$refs.card.valueChange(12333333333));
      // this.value = 333
    },
    log() {
      console.log(1233333334);
    },
    logg() {
      console.log(this.$refs.card.valueChange(12));
      console.log(this.$refs.card.getValue());
    }
  },
  data() {
    return {
      value: 12,
    };
  },
}
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
