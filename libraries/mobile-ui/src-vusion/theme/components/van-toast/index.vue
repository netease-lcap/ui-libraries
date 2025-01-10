<template>
  <div style="position: relative; height: 50px" ref="toastWrap">
    <van-toast 
      ref="toast"
      message="弹出消息"
      :duration="0" 
      type="custom" 
      @open="onShow" 
      @close="onHide"></van-toast>
  </div>
</template>
<script>
export default {
  mounted() {
    this.onOpen()
    window.LcapMicro = {
      appendTo: this.$refs.toastWrap
    }
  },
  methods: {
    onOpen() {
      this.$refs.toast.open()
    },
    onShow() {
      console.log('show1');
    },
    onHide() {
      console.log('hide1');
    }
  },
};
</script>

<style>
.van-toast-group {
  position: absolute !important;
}
</style>