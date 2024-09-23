<!-- 多选框组 -->
<!--  适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。 -->
<template>
  <div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
      <el-checkbox label="禁用" disabled></el-checkbox>
      <el-checkbox label="选中且禁用" disabled></el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkList: ['选中且禁用', '复选框 A'],
    };
  },
};
</script>
