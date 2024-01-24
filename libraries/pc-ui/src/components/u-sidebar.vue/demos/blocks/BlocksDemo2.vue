<!-- 折叠功能 -->

<template>
  <u-sidebar collapsible :router="true">
    <u-sidebar-group expanded>
        <template #title><u-text text="导航一"></u-text></template>
        <u-sidebar-item><u-text text="选项一"></u-text></u-sidebar-item>
    </u-sidebar-group>
    <u-sidebar-group expanded disabled>
        <template #title><u-text text="导航二"></u-text></template>
        <u-sidebar-item><u-text text="选项一"></u-text></u-sidebar-item>
    </u-sidebar-group>
</u-sidebar>
</template>