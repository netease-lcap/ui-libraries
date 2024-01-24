<!-- 设置颜色 -->
<template>
<u-linear-layout>
    <u-button @click="show('info')">Info</u-button>
    <u-button @click="show('success')">Success</u-button>
    <u-button @click="show('warning')">Warning</u-button>
    <u-button @click="show('error')">Error</u-button>
</u-linear-layout>
</template>

<script>
export default {
    methods: {
        show(color) {
            this.$toast[color]('color: ' + color);
        },
    },
};
</script>