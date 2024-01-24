<!-- 基本用法 -->

<template>
  <u-transfer showHead sourceTitle="左列表" targetTitle="右列表"
:source="[{ text: 'SQL', value: 'sql' },{ text: 'JSON', value: 'json' },]" :target="[{ text: 'CSS', value: 'css' },{ text: 'HTML', value: 'html' },{ text: 'JavaScript', value: 'javascript' },{ text: 'Vue', value: 'vue' },]"></u-transfer>
</template>