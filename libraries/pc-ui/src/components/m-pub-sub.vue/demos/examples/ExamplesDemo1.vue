<!-- 使用方法 -->
<template>
<u-button @click="onClick">发布</u-button>
</template>
<script>
import { MPublisher } from 'cloud-ui.vusion';

export default {
    mixins: [MPublisher],
    data() {
        return {
            value: undefined,
        };
    },
    methods: {
        onClick() {
            this.value = this.value === 'red' ? 'blue' : 'red';
            this.$publish('color', this.value);
        },
    },
};
</script>