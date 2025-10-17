<!-- 基本用法 -->

<template>
  <div>
    <el-list-components :column="4" :equal-width="false" :data-source="Array(100).fill(0)" :row-gap="10" :column-gap="10">
      <template #default="scope">
        <el-button style="width:500px">{{ scope.item }}</el-button>
      </template>
    </el-list-components>
  </div>
</template>
