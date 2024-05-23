<template>
<div><van-button @click="onOpen">Dialog</van-button><van-dialog safe-area-inset-bottom ref="dialogh5">
  <div vusion-slot-name="default" vusion-disabled-copy style="min-height: 100px;" :vusion-disabled-cut="true" env="alone">内容</div>
  <template #footer>
    <van-button
      :vusion-disabled-cut="true"
   @click="onclose"   size="large"
      class="van-button van-button--van-default van-button--van-large van-dialog__cancel"
      text="取消"
    ></van-button>
    <van-button
  @click="onclose"    :vusion-disabled-cut="true"
      size="large"
      class="van-button van-button--van-default van-button--van-large van-dialog__confirm van-hairline--van-left"
      text="确认"
    ></van-button>
  </template>
</van-dialog></div>


</template>
<script>
export default {
    data() {
        return {
            showpopup: false,
        };
    },
    methods: {
        onOpen() {
            this.$refs.dialogh5.openModal();
        },
    onclose() {
            this.$refs.dialogh5.closeModal();
        },},
};
</script>
