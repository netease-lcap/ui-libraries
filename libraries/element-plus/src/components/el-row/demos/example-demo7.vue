<!-- 基础布局 -->
<!--  列click事件 -->
<template>
  <div>
    <el-row>
      <el-col :span="8" @click="onClick"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"
        @click="onClick1"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    onClick(data) {
      console.log('click', data);
    },
    onClick1(data) {
      console.log('click1', data);
    },
  },
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
