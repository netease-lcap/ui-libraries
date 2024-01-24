<!-- 触发方式 -->

<template>
  <div><u-linear-layout>
    <u-dropdown trigger="hover">
        <template #title="scope">
            <u-text text="下拉菜单hover展开"></u-text>
        </template>
        <u-dropdown-item text="item"></u-dropdown-item>
        <u-dropdown-item text="item"></u-dropdown-item>
        <u-dropdown-item text="item"></u-dropdown-item>
        <u-dropdown-item disabled text="item"></u-dropdown-item>
        <u-dropdown-group title="下拉组">
            <u-dropdown-item text="item1"></u-dropdown-item>
            <u-dropdown-item text="item1"></u-dropdown-item>
            <u-dropdown-item text="item1"></u-dropdown-item>
            <u-dropdown-item disabled text="item1"></u-dropdown-item>
        </u-dropdown-group>
    </u-dropdown>
    <u-dropdown trigger="click">
        <template #title="scope">
            <u-text text="下拉菜单click展开"></u-text>
        </template>
        <u-dropdown-item text="item"></u-dropdown-item>
        <u-dropdown-item text="item"></u-dropdown-item>
        <u-dropdown-item text="item"></u-dropdown-item>
        <u-dropdown-item disabled text="item"></u-dropdown-item>
        <u-dropdown-group title="下拉组">
            <u-dropdown-item text="item1"></u-dropdown-item>
            <u-dropdown-item text="item1"></u-dropdown-item>
            <u-dropdown-item text="item1"></u-dropdown-item>
            <u-dropdown-item disabled text="item1"></u-dropdown-item>
        </u-dropdown-group>
    </u-dropdown>
</u-linear-layout></div>
</template>