<!-- 位置扩展 -->
<template>
<u-linear-layout>
    <u-button @click="show('top-center')">Top Center</u-button>
    <u-button @click="show('top-left')">Top Left</u-button>
    <u-button @click="show('top-right')">Top Right</u-button>
    <u-button @click="show('bottom-center')">Bottom Center</u-button>
    <u-button @click="show('bottom-left')">Bottom Left</u-button>
    <u-button @click="show('bottom-right')">Bottom Right</u-button>
</u-linear-layout>
</template>

<script>
export default {
    methods: {
        show(position) {
            this.$toast.position = position;
            this.$toast.show('position: ' + position);
        },
    },
};
</script>