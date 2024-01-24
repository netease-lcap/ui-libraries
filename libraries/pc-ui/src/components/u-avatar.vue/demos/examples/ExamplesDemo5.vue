<!-- 配合 UNavbar 使用 -->

<template>
  <div><u-navbar>
    <u-navbar-item to="/components">组件</u-navbar-item>
    <u-navbar-item>概念</u-navbar-item>
    <u-navbar-item disabled>指令</u-navbar-item>
    <u-navbar-divider></u-navbar-divider>
    <u-navbar-item>配置</u-navbar-item>
    <div slot="right">
        <u-navbar-item>
            <u-avatar></u-avatar> 王小明
        </u-navbar-item>
    </div>
</u-navbar></div>
</template>