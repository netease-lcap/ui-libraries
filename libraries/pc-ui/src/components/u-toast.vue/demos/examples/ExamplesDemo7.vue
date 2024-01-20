<!-- 提示停留时间 -->
<template>
<u-linear-layout>
    <u-button @click="show(1000)">1s</u-button>
    <u-button @click="show(3000)">3s</u-button>
    <u-button @click="show(10000)">10s</u-button>
    <u-button @click="show(0)">常驻</u-button>
</u-linear-layout>
</template>

<script>
export default {
    methods: {
        show(duration) {
            this.$toast.show('duration: ' + duration + ' ms', duration);
        },
    },
};
</script>