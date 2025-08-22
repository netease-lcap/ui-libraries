<template>
  <div>
    <el-radio-group :type="type" size="default">
      <el-radio value="1">
        <el-text :text="activeLabel"></el-text>
      </el-radio>
      <el-radio label="选项2" value="2">
        <el-text text="选项2"></el-text>
      </el-radio>
      <el-radio value="3">
        <el-text text="选项3"></el-text>
      </el-radio>
      <el-radio :value="5">
        <el-text text="多选项"></el-text>
      </el-radio>
    </el-radio-group>
  </div>

  <el-button @click="handleChange" type="primary">切换选项1 label</el-button>
  <el-button @click="changeType" type="primary">切换类型</el-button>

  <el-divider></el-divider>
  <div>
    <el-radio-group type="border" size="default">
      <el-radio value="1">
        <el-text :text="activeLabel"></el-text>
      </el-radio>
      <el-radio label="选项2" value="2">
        <el-text text="选项2"></el-text>
      </el-radio>
      <el-radio value="3">
        <el-text text="选项3"></el-text>
      </el-radio>
      <el-radio :value="5">
        <el-text text="多选项"></el-text>
      </el-radio>
    </el-radio-group>
  </div>
  <el-divider></el-divider>

  <div>
    <el-radio-group type="button" size="default">
      <el-radio value="1">
        <el-text :text="activeLabel"></el-text>
      </el-radio>
      <el-radio label="选项2" value="2">
        <el-text text="选项2"></el-text>
      </el-radio>
      <el-radio value="3">
        <el-text text="选项3"></el-text>
      </el-radio>
      <el-radio :value="5">
        <el-text text="多选项"></el-text>
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const activeLabel = ref('选项1');
const handleChange = () => {
  activeLabel.value = Math.random() * 10;
  console.log(activeLabel.value);
};

const type = ref('default');
const changeType = () => {
  const types = ['default', 'border', 'button'];
  const availableTypes = types.filter((t) => t !== type.value);
  type.value = availableTypes[Math.floor(Math.random() * availableTypes.length)];
  console.log(type.value);
};
</script>
