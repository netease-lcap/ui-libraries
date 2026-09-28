<template>
  <u-sidebar :router="true" enableCollapse collapsible>
    <u-sidebar-group expanded icon="calendar">
      <template #title><u-text text="导航一"></u-text></template>
      <u-sidebar-item><u-text text="选项一"></u-text></u-sidebar-item>
      <u-sidebar-group expanded>
        <template #title><u-text text="导航一"></u-text></template>
        <u-sidebar-item><u-text text="选项一"></u-text></u-sidebar-item>
        <u-sidebar-item><u-text text="选项二"></u-text></u-sidebar-item>
        <u-sidebar-item><u-text text="选项三"></u-text></u-sidebar-item>
      </u-sidebar-group>
    </u-sidebar-group>
    <u-sidebar-group expanded icon="home">
      <template #title>
        <u-text text="导航二"></u-text>
      </template>
      <u-sidebar-item><u-text text="选项一"></u-text></u-sidebar-item>
    </u-sidebar-group>
  </u-sidebar>
</template>
