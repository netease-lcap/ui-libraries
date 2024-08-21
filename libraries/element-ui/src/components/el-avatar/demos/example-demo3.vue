<!-- 图片加载失败的 fallback 行为 -->
<!--  当展示类型为图片的时候，图片加载失败的 fallback 行为 -->
<template>
  <div>
    <div class="demo-type">
      <el-avatar
        :size="60"
        src="https://empty"
        fallbackSrc="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        @error="errorHandler">
      </el-avatar>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    errorHandler() {
      return true;
    },
  },
};
</script>
