<!-- 基本用法 -->

<template>
  <div>
    {{ list }}
    <!-- <el-form> -->
    <el-list-components :column="1" :equal-width="false" :formMode="true" :model="list" >
      <template #default="scope">
        <el-button style="width:500px;margin-bottom: 10px;">{{ scope.item }}</el-button>
        <el-text>123</el-text>
        <el-form-input  :rules="[{validate: 'filled',message: '表单项不得为空',trigger: 'input+blur',required: true}]" v-model="scope.item.value"></el-form-input>
      </template>
    </el-list-components>
    <!-- </el-form> -->
    <el-form style="width: 50px;">
      <el-input></el-input>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const list = ref([{ value: 0 }]);
const value = ref(0);
</script>