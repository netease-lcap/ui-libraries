<template>
  <el-pagination
    v-model:current-page="currentPage"
    :total="100"
    :page-size="10"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
const handleCurrentChange = (val) => {
  console.log(`Current page: ${val}`)
}
</script> 