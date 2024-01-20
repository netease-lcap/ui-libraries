<!-- 垂直方向 -->

<template>
  <div><u-linear-layout>
    <u-linear-progress :percent="36" direction="vertical" size="small">small</u-linear-progress>
    <u-linear-progress :percent="36" direction="vertical" size="normal" >normal</u-linear-progress>
    <u-linear-progress :percent="36" direction="vertical" size="large" color="error" :range="[20]">large</u-linear-progress>
    <u-linear-progress :percent="36" direction="vertical" size="huge" color="success" :range="[20,50]">huge</u-linear-progress>
</u-linear-layout></div>
</template>