<!-- 使用指令 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-actions>
        <u-action disabled>设置</u-action>
        <u-action v-tooltip="'跳转到 Navbar'" to="/components/u-navbar">显示Tips</u-action>
        <u-action>重启</u-action>
        <u-action disabled>保存为镜像</u-action>
        <u-action v-tooltip="'跳转到 Select'" to="/components/u-select">显示Tips</u-action>
    </u-actions>
</u-linear-layout></div>
</template>