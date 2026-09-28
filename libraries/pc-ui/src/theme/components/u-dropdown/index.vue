<template>
  <u-linear-layout>
    <u-dropdown>
      <template #title="scope"> <u-text text="下拉菜单"></u-text></template>
      <u-dropdown-item text="item"> </u-dropdown-item>
      <u-dropdown-item text="item"> </u-dropdown-item>
      <u-dropdown-group title="下拉组">
        <u-dropdown-item text="item1"></u-dropdown-item>
        <u-dropdown-item text="item1"></u-dropdown-item>
        <u-dropdown-item text="item1"></u-dropdown-item>
        <u-dropdown-item disabled text="item1"></u-dropdown-item>
      </u-dropdown-group>
    </u-dropdown>
    <u-dropdown type="primary">
      <template #title="scope"> <u-text text="下拉菜单"></u-text></template>
      <u-dropdown-item text="item"> </u-dropdown-item>
      <u-dropdown-item text="item"> </u-dropdown-item>
      <u-dropdown-group title="下拉组">
        <u-dropdown-item text="item1"></u-dropdown-item>
        <u-dropdown-item text="item1"></u-dropdown-item>
        <u-dropdown-item text="item1"></u-dropdown-item>
        <u-dropdown-item disabled text="item1"></u-dropdown-item>
      </u-dropdown-group>
    </u-dropdown>
    <u-dropdown type="primary_secondary">
      <template #title="scope"> <u-text text="下拉菜单"></u-text></template>
      <u-dropdown-item text="item"> </u-dropdown-item>
      <u-dropdown-item text="item"> </u-dropdown-item>
      <u-dropdown-group title="下拉组">
        <u-dropdown-item text="item1"></u-dropdown-item>
        <u-dropdown-item text="item1"></u-dropdown-item>
        <u-dropdown-item disabled text="item1"></u-dropdown-item>
      </u-dropdown-group>
    </u-dropdown>
    <u-dropdown type="normal">
      <template #title="scope"> <u-text text="下拉菜单"></u-text></template>
      <u-dropdown-item text="item"> </u-dropdown-item>
      <u-dropdown-item text="item"> </u-dropdown-item>
      <u-dropdown-group title="下拉组">
        <u-dropdown-item text="item1"></u-dropdown-item>
        <u-dropdown-item text="item1"></u-dropdown-item>
        <u-dropdown-item disabled text="item1"></u-dropdown-item>
      </u-dropdown-group>
    </u-dropdown>
    <u-dropdown type="more">
      <template #title="scope"> <u-text text="下拉菜单"></u-text></template>
      <u-dropdown-item text="item"> </u-dropdown-item>
      <u-dropdown-item text="item"> </u-dropdown-item>
      <u-dropdown-group title="下拉组">
        <u-dropdown-item text="item1"></u-dropdown-item>
        <u-dropdown-item text="item1"></u-dropdown-item>
        <u-dropdown-item text="item1"></u-dropdown-item>
        <u-dropdown-item disabled text="item1"></u-dropdown-item>
      </u-dropdown-group>
    </u-dropdown>
  </u-linear-layout>
</template>
