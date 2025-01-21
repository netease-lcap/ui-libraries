<!-- 基本用法 -->
<template>
    <div>
        <u-toast ref="toast" @before-close="handleClose" position="static">这是一条消息</u-toast>
    </div>
  </template>
  
<script>
  export default {
    mounted() {
      this.$refs.toast.show()
    },
    methods: {
      handleClose(ok) {
        return ok.preventDefault()
      }
    }
  }
</script>