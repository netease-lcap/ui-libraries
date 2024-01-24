<!-- 左右插槽 -->

<template>
  <div><u-navbar>
    <s-logo slot="left"></s-logo>
    <u-navbar-item to="/components">组件</u-navbar-item>
    <u-navbar-item>概念</u-navbar-item>
    <u-navbar-item disabled>指令</u-navbar-item>
    <u-navbar-item slot="right" href="https://github.com/vusion/cloud-ui" target="_blank"><i-icon name="github"></i-icon></u-navbar-item>
</u-navbar></div>
</template>