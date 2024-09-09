<template>
  <div>
    <el-button :plain="true" @click="open1">消息</el-button>
    <el-button :plain="true" @click="open2">成功</el-button>
    <el-button :plain="true" @click="open3">警告</el-button>
    <el-button :plain="true" @click="open4">错误</el-button>
    <el-message :visible.sync="visible1" :showClose="true">这是一条消息提示</el-message>
    <el-message :visible.sync="visible2" icon="ri-arrow-up-circle-fill" type="success" :showClose="true">恭喜你，这是一条成功消息</el-message>
    <el-message :visible.sync="visible3" type="warning" :showClose="true">警告哦，这是一条警告消息</el-message>
    <el-message :visible.sync="visible4" type="error" :showClose="true">这是一条消息提示</el-message>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
    };
  },
  methods: {
    open1() {
      this.visible1 = true;
    },
    open2() {
      this.visible2 = true;
    },
    open3() {
      this.visible3 = true;
    },
    open4() {
      this.visible4 = true;
    },
  },
};
</script>
