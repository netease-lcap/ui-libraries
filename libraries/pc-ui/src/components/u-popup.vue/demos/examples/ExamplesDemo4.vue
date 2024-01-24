<!-- 手动触发 -->
<template>
<u-button @click="opened = !opened">
    {{ opened ? '隐藏' : '弹出' }}
    <u-popup trigger="manual" :opened.sync="opened">Popup</u-popup>
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