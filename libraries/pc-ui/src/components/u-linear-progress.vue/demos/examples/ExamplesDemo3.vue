<!-- 范围限制 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-linear-progress :range="[20]" :percent="36">20</u-linear-progress>
    <u-linear-progress :range="[20,50]" :percent="36">20,50</u-linear-progress>
</u-linear-layout></div>
</template>