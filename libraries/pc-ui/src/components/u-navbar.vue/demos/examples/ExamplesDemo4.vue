<!-- 与 Logo 结合 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-navbar style="background: #4289db;">
        <s-logo slot="left"><a href="/" target="_blank">ICP 备案系统</a></s-logo>
        <u-navbar-item to="u-navbar">主体</u-navbar-item>
        <u-navbar-item>备案管理</u-navbar-item>
        <u-navbar-item>帮助</u-navbar-item>
    </u-navbar>
    <u-navbar alignment="right" style="background: #151d2b;">
        <s-logo slot="left"></s-logo>
        <u-navbar-item>产品</u-navbar-item>
        <u-navbar-item to="u-navbar">价格</u-navbar-item>
        <u-navbar-item>帮助</u-navbar-item>
        <u-navbar-item>合作与生态</u-navbar-item>
        <u-navbar-item>博客</u-navbar-item>
        <u-navbar-item>备案</u-navbar-item>
    </u-navbar>
</u-linear-layout></div>
</template>