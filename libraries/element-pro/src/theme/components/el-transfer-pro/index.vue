<template>
  <div>
    <div class="actions-warp">
      <el-checkbox-pro v-model="disabled">是否禁用</el-checkbox-pro>
      <el-checkbox-pro v-model="search">是否可搜索</el-checkbox-pro>
      <el-checkbox-pro v-model="showExtra">是否带footer</el-checkbox-pro>
    </div>

    <el-transfer-pro v-show="!showExtra" :dataSource="list" :search="search" :disabled="disabled">
    </el-transfer-pro>

    <el-transfer-pro v-show="showExtra" :dataSource="list" :search="search" :disabled="disabled">
      <template v-slot:titlesource>
        来源
      </template>
      <template v-slot:titletarget>
        目标
      </template>
      <template v-slot:footersource>
        <div style="padding: 12px 20px">
          选中并加入
        </div>
      </template>
      <template v-slot:footertarget>
        <div style="padding: 12px 20px">
          选中并移除
        </div>
      </template>
    </el-transfer-pro>
  </div>
</template>
<script>
const initialList = [];
for (let i = 0; i < 20; i++) {
  initialList.push({
    value: i.toString(),
    label: `内容${i + 1}`,
    disabled: i % 4 === 0,
  });
}

export default {
  data() {
    return {
      disabled: false,
      search: false,
      pagination: false,
      emptyData: false,
      showExtra: false,
      list: initialList,
    }
  },
}
</script>

<style scoped>
.actions-warp {
  font-size: 12px;
  margin: 10px 0 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>