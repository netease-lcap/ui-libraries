<template>
  <div>
    <el-alert title="不可关闭的 alert" type="success" :closable="false">
    </el-alert>
    <el-alert title="自定义 close-text" type="info" close-text="知道了">
    </el-alert>
    <el-alert title="设置了回调的 alert" type="warning" @close="hello">
    </el-alert>
  </div>
</template>
<script lang="ts" setup>
  const hello = () => {
    // eslint-disable-next-line no-alert
    alert('Hello World!')
  }
</script>

<style scoped>
.el-alert {
  margin: 20px 0 0;
}
.el-alert:first-child {
  margin: 0;
}
</style>
