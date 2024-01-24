<!-- 基本用法 -->

<template>
  <div><u-dropdown>
    <template #title="scope">
        <u-text text="下拉菜单"></u-text>
    </template>
    <u-dropdown-item text="item"></u-dropdown-item>
    <u-dropdown-item text="item"></u-dropdown-item>
    <u-dropdown-item text="item"></u-dropdown-item>
    <u-dropdown-item disabled text="item"></u-dropdown-item>
</u-dropdown>
<u-dropdown type="primary">
    <template #title="scope">
        <u-text text="下拉按钮"></u-text>
    </template>
    <u-dropdown-item text="item"></u-dropdown-item>
    <u-dropdown-item text="item"></u-dropdown-item>
    <u-dropdown-item text="item"></u-dropdown-item>
    <u-dropdown-item disabled text="item"></u-dropdown-item>
</u-dropdown>
<u-dropdown type="primary_secondary">
    <template #title="scope">
        <u-text text="下拉按钮"></u-text>
    </template>
    <u-dropdown-item text="item"></u-dropdown-item>
    <u-dropdown-item text="item"></u-dropdown-item>
    <u-dropdown-item text="item"></u-dropdown-item>
    <u-dropdown-item disabled text="item"></u-dropdown-item>
</u-dropdown>
<u-dropdown type="normal">
    <template #title="scope">
        <u-text text="下拉按钮"></u-text>
    </template>
    <u-dropdown-item text="item"></u-dropdown-item>
    <u-dropdown-item text="item"></u-dropdown-item>
    <u-dropdown-item text="item"></u-dropdown-item>
    <u-dropdown-item disabled text="item"></u-dropdown-item>
</u-dropdown>
<u-dropdown type="more">
    <template #title="scope">
        <u-text text="下拉按钮"></u-text>
    </template>
    <u-dropdown-item text="item"></u-dropdown-item>
    <u-dropdown-item text="item"></u-dropdown-item>
    <u-dropdown-item text="item"></u-dropdown-item>
    <u-dropdown-item disabled text="item"></u-dropdown-item>
</u-dropdown></div>
</template>