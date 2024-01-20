<!-- 基本用法 -->
<template>
<div>
    <u-drawer :visible.sync="visible" title="标题">
        <u-sidebar slot="drawer">
            <u-sidebar-item>指南</u-sidebar-item>
            <u-sidebar-item>概念</u-sidebar-item>
            <u-sidebar-item to="/cloud-ui">组件</u-sidebar-item>
        </u-sidebar>
    </u-drawer>
    <u-linear-layout>
        <u-button @click="visible = true">Drawer</u-button>
    </u-linear-layout>
</div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
        };
    },
};
</script>