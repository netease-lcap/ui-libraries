<template>
  <el-anchor type="underline" :offset="100" @click="handleClick">
    <el-anchor-link href="#section1" title="部分一"></el-anchor-link>
    <el-anchor-link href="#section2" title="部分二"></el-anchor-link>
    <el-anchor-link href="#section3" title="部分三"></el-anchor-link>
  </el-anchor>

  <!-- 目标位置 -->
  <div id="section1">部分一的内容</div>
  <div id="section2">部分二的内容</div>
  <div id="section3">部分三的内容</div>
</template>

<script setup>
const handleClick = (event, href) => {
  event.preventDefault();
  console.log(href);
};
</script>

<style>
#section1 {
  height: 300px;
  border: 1px solid #c26438;
}

#section2 {
  height: 300px;
  border: 1px solid #57def3;
}

#section3 {
  height: 300px;
  border: 1px solid #19e24b;
}
</style>
