<!-- 两栏-左侧固定-无顶部导航 -->

<template>
  <u-multi-layout direction="vertical">
    <u-multi-layout-item>
      <u-multi-layout>
        <u-multi-layout-item :liberty="true" style="width:200px;flex:0 0 auto"> </u-multi-layout-item>
        <u-multi-layout-item style="overflow: auto;"> </u-multi-layout-item>
      </u-multi-layout>
    </u-multi-layout-item>
  </u-multi-layout>
</template>
