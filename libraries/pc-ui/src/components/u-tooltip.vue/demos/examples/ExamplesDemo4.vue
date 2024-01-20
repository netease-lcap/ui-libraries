<!-- 手动触发 -->
<template>
<u-button @click="opened = !opened">
    {{ opened ? '隐藏' : '弹出' }}
    <u-tooltip trigger="manual" :opened.sync="opened">Tooltip</u-tooltip>
</u-button>
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