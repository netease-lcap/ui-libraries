<template>
  <div>
    <div class="actions-warp">
      <el-checkbox v-model="multiple">是否多选</el-checkbox>
      <el-checkbox v-model="disabled">是否禁用</el-checkbox>
      <el-checkbox v-model="filterable">是否可搜索</el-checkbox>
      <el-checkbox v-model="emptyData">是否置空数据</el-checkbox>
    </div>
    <el-cascader :dataSource="emptyData ? [] : list" valueField="id" textField="name" parentField="parentId"
      :multiple="multiple" :disabled="disabled" :size="size" :filterable="filterable" :autofocus="true"
      clearable></el-cascader>
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
};
</script>

<style scoped>
.actions-warp {
  display: flex;
  gap: 10px;
  margin: 10px 0 20px 0;
}
</style>