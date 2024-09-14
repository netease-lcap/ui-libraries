<template>
  <div>
    <el-radio-group-pro v-model="size">
      <el-radio-pro value="small">小尺寸</el-radio-pro>
      <el-radio-pro value="medium">中尺寸(默认)</el-radio-pro>
      <el-radio-pro value="large">大尺寸</el-radio-pro>
    </el-radio-group-pro>
    <div class="actions-warp">
      <el-checkbox-pro v-model="multiple">是否多选</el-checkbox-pro>
      <el-checkbox-pro v-model="disabled">是否禁用</el-checkbox-pro>
      <el-checkbox-pro v-model="filterable">是否可搜索</el-checkbox-pro>
      <el-checkbox-pro v-model="emptyData">是否置空数据</el-checkbox-pro>
    </div>
    <el-cascader-pro :dataSource="emptyData ? [] : list" valueField="id" textField="name" parentField="parentId"
      :multiple="multiple" :disabled="disabled" :size="size" :filterable="filterable" :autofocus="true"
      clearable></el-cascader-pro>
  </div>
</template>
<script>

export default {
  data() {
    return {
      size: 'medium',
      multiple: false,
      disabled: false,
      emptyData: false,
      filterable: false,
      // popupVisible: false,
      list: [
        { id: 1, name: 'Node 1', parentId: null },
        { id: 2, name: 'Node 1.1', parentId: 1 },
        { id: 3, name: 'Node 1.1.1', parentId: 2 },
        { id: 4, name: 'Node 1.2', parentId: 1, disabled: true },
        { id: 5, name: 'Node 2', parentId: null },
        { id: 6, name: 'Node 2.1', parentId: 5 },
      ],
    };
  },
}
</script>
<style scoped>
.actions-warp {
  display: flex;
  gap: 10px;
  margin: 10px 0 20px 0;
}
</style>