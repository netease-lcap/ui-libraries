<!-- 手风琴模式 -->

<template>
  <u-sidebar collapsible accordion :router="true">
    <u-sidebar-group>
        <template #title><u-text text="导航一"></u-text></template>
        <u-sidebar-item><u-text text="选项一"></u-text></u-sidebar-item>
    </u-sidebar-group>
    <u-sidebar-group>
        <template #title><u-text text="导航二"></u-text></template>
        <u-sidebar-item><u-text text="选项一"></u-text></u-sidebar-item>
    </u-sidebar-group>
    <u-sidebar-group>
        <template #title><u-text text="导航三"></u-text></template>
        <u-sidebar-item><u-text text="选项一"></u-text></u-sidebar-item>
    </u-sidebar-group>
</u-sidebar>
</template>