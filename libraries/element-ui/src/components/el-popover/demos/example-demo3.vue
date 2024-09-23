<!-- 嵌套操作 -->
<!--  当然，你还可以嵌套操作，这相比 Dialog 更为轻量： -->
<template>
  <div>
    <el-popover placement="top" width="160" v-model="visible">
      <p>这是一段内容这是一段内容确定删除吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false"
          >取消</el-button
        >
        <el-button type="primary" size="mini" @click="visible = false"
          >确定</el-button
        >
      </div>
      <el-button slot="reference">删除</el-button>
    </el-popover>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
};
</script>
