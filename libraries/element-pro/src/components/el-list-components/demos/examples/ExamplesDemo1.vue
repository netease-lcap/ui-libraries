<!-- 基本用法 -->

<template>
  <div><el-list-components :data-source="[1, 2, 3, 4, 5]">
      <template #default="scope">
        <el-button>Button</el-button>
      </template>
    </el-list-components></div>
</template>