<template>
  <div>
    <u-modal title="标题" visible static @before-close="handleClose">
      <div style="position: relative; width: 100%; height: 85px; background: #f2f3f5; text-align: center">
        <u-text style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">对话框内容</u-text>
      </div>
      <template #foot>
        <u-linear-layout justify="center">
          <u-button color="primary">确 定</u-button>
          <u-button>取 消</u-button>
        </u-linear-layout>
      </template>
    </u-modal>
  </div>
</template>
<script>
export default {
  methods: {
    handleClose(ok) {
      return ok.preventDefault();
    },
  },
};
</script>
