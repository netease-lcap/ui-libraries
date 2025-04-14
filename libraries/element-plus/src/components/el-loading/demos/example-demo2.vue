<template>
  <div>
    <el-loading 
      :visible="loading1" 
      :target="target1" 
      background="rgba(122, 122, 122, 0.8)"
      text="Loading..."
      svgViewBox="-10, -10, 50, 50"
      :svg="svg"
    >
      <el-table
        :data="tableData"
        style="width: 100%"
        ref="table1Ref"
      >
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </el-loading>
    <el-loading 
      :visible="loading2" 
      :target="target2" 
      :svg="svg"
      svgViewBox="-10, -10, 50, 50"
    >
      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 50px"
        ref="table2Ref"
      >
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </el-loading>
    <button @click="handleClick" style="position: relative; top: 100px">切换Loading态</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const loading1 = ref(false)
const loading2 = ref(false)
const table1Ref = ref()
const table2Ref = ref()

const target1 = computed(() => table1Ref.value?.$el?.nextSibling);
const target2 = computed(() => table2Ref.value?.$el?.nextSibling);

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
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

const handleClick = () => {
  loading1.value = !loading1.value
  loading2.value = !loading2.value
}
</script>
<style>
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
