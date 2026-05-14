<template>
  <el-row class="tac" style="height: 700px;">
    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        v-model:collapse="collapse"
        @open="handleOpen"
        @click="handleClick"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon name="Location"></el-icon>
            <el-text>Navigator aaaaaaaaaaaa</el-text>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1"><el-text>item one</el-text></el-menu-item>
            <el-menu-item index="1-2"><el-text>item two</el-text></el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3"><el-text>item three</el-text></el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1"><el-text>item one</el-text></el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <el-text>NavigTaaaaaaaaaaaaaawo</el-text>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <el-text>Navigator Three</el-text>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon name="Setting"></el-icon>
          <el-text>Navigator Four</el-text>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const collapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClick = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
