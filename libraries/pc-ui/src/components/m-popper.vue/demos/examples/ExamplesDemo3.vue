<!-- 手动触发 -->
<template>
<u-button @click="opened = !opened">
    {{ opened ? '隐藏' : '弹出' }}
    <m-popper trigger="manual" :opened.sync="opened">
        <u-block>popper</u-block>
    </m-popper>
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