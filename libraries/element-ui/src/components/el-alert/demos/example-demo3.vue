<!-- 自定义关闭按钮 -->
<!--  自定义关闭按钮为文字或其他符号。 -->
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
<script>
export default {
  methods: {
    hello() {
      alert('Hello World!');
    },
  },
};
</script>
