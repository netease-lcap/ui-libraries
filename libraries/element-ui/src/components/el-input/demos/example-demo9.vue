<!-- 尺寸 -->
<!--  -->
<template>
  <div>
    <div class="demo-input-size">
      <el-input
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="input1">
      </el-input>
      <el-input
        size="medium"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="input2">
      </el-input>
      <el-input
        size="small"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="input3">
      </el-input>
      <el-input
        size="mini"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="input4">
      </el-input>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
    };
  },
};
</script>
