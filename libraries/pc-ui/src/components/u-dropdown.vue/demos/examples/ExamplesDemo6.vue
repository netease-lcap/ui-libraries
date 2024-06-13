<!-- 手动触发 -->
<template>
<u-linear-layout>
    <u-button @click="opened = !opened">
        {{ opened ? '隐藏' : '弹出' }}
    </u-button>
    <u-dropdown trigger="manual" :opened="opened">
        <template #title="scope">
            <u-text text="下拉菜单"></u-text>
        </template>
        <u-dropdown-item text="item"></u-dropdown-item>
        <u-dropdown-item text="item"></u-dropdown-item>
        <u-dropdown-item text="item"></u-dropdown-item>
        <u-dropdown-item disabled text="item"></u-dropdown-item>
    </u-dropdown>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            opened: false,
        };
    },
};
</script>
