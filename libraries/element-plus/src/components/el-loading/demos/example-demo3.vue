<template>
  <div>
    <el-loading :visible="loading" :fullscreen="true" :lock="true">
      <el-table :data="tableData" style="width: 100%" ref="elTableRef">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </el-loading>
    <button @click="openFullScreen" style="position: relative; top: 100px">开启满屏Loading</button>
  </div>
</template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const loading = ref(false)
  const elTableRef = ref();

  const openFullScreen = () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 2000)
  }

  const tableData = [
    {
      date: '2016-05-02',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
    {
      date: '2016-05-04',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
    {
      date: '2016-05-01',
      name: 'John Smith',
      address: 'No.1518,  Jinshajiang Road, Putuo District',
    },
  ]
</script>
  
<style>
body {
  margin: 0;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>