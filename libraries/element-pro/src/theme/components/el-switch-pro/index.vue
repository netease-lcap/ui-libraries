<template>
  <div>
    <div class="desc">不同尺寸：
      <el-switch-pro size='small'></el-switch-pro>
      <el-switch-pro></el-switch-pro>
      <el-switch-pro size='large'></el-switch-pro>
      <el-switch-pro size='large' v-model="checked1"></el-switch-pro>
    </div>

    <div class="desc">不同状态：
      <el-switch-pro loading></el-switch-pro>
      <el-switch-pro loading v-model="checked2"></el-switch-pro>
      <el-switch-pro disabled></el-switch-pro>
      <el-switch-pro disabled v-model="checked3"></el-switch-pro>
    </div>

    <div class="desc">带描述的开关：
      <el-switch-pro :label="['开', '关']" size='small'></el-switch-pro>
      <el-switch-pro :label="['开', '关']" v-model="checked4" size='small'></el-switch-pro>

      <el-switch-pro :label="['开', '关']"></el-switch-pro>
      <el-switch-pro :label="['开', '关']" v-model="checked5"></el-switch-pro>

      <el-switch-pro :label="['开', '关']" size='large'></el-switch-pro>
      <el-switch-pro :label="['开', '关']" v-model="checked6" size='large'></el-switch-pro>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked1: true,
      checked2: true,
      checked3: true,
      checked4: true,
      checked5: true,
      checked6: true,
    }
  },
}
</script>

<style scoped>
.desc {
  font-size: 12px;
  margin: 20px 0 5px;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>