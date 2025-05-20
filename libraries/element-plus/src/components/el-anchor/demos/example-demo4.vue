<template>
  <el-anchor :dataSource="data" :offset="100" @click="handleClick"></el-anchor>

  <!-- 目标位置 -->
  <div id="section1">部分一的内容</div>
  <div id="section2">部分二的内容</div>
  <div id="section3">部分三的内容</div>
</template>

<script setup>
const data = [
  {
    title: '部分一',
    href: '#section1',
  },
  {
    title: '部分二',
    href: '#section2',
  },
  {
    title: '部分三',
    href: '#section3',
  },
];
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
