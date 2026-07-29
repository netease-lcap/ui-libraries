<template>
  <el-anchor :dataSource="data" :offset="100" @click="handleClick"></el-anchor>
</template>

<script setup>
const data = [
  {
    title: '{{ item.title }}',
    href: '#section1',
  },
  {
    title: '{{ item.title }}',
    href: '#section2',
  },
  {
    title: '{{ item.title }}',
    href: '#section3',
  },
];
const handleClick = (event, href) => {
  event.preventDefault();
  console.log(href);
};
</script>

<style scoped>
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
