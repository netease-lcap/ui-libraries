<template>
  <div>
    <el-checkbox-group :type="type" size="default" direction="horizontal" column="2" min="2">
      <el-checkbox value="1">
        <el-text :text="activeLabel"></el-text>
      </el-checkbox>
      <el-checkbox label="选项2" value="2">
        <el-text text="选项2"></el-text>
      </el-checkbox>
      <el-checkbox value="3">
        <el-text text="选项3"></el-text>
      </el-checkbox>
      <el-checkbox :value="5">
        <el-text text="多选项"></el-text>
      </el-checkbox>
    </el-checkbox-group>
  </div>

  <el-button @click="handleChange" type="primary">切换选项1 label</el-button>
  <el-button @click="changeType" type="primary">切换类型</el-button>

  <el-divider></el-divider>
  <div>
    <el-checkbox-group type="border" size="default">
      <el-checkbox value="1">
        <el-text :text="activeLabel"></el-text>
      </el-checkbox>
      <el-checkbox label="选项2" value="2">
        <el-text text="选项2"></el-text>
      </el-checkbox>
      <el-checkbox value="3">
        <el-text text="选项3"></el-text>
      </el-checkbox>
      <el-checkbox :value="5">
        <el-text text="多选项"></el-text>
      </el-checkbox>
    </el-checkbox-group>
  </div>
  <el-divider></el-divider>

  <div>
    <el-checkbox-group type="button" size="default">
      <el-checkbox value="1">
        <el-text :text="activeLabel"></el-text>
      </el-checkbox>
      <el-checkbox label="选项2" value="2">
        <el-text text="选项2"></el-text>
      </el-checkbox>
      <el-checkbox value="3">
        <el-text text="选项3"></el-text>
      </el-checkbox>
      <el-checkbox :value="5">
        <el-text text="多选项"></el-text>
      </el-checkbox>
    </el-checkbox-group>
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
