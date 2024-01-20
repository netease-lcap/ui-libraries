<!-- 使用 Option -->
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
    publish: {
        someTopic: 'value',
    },
    methods: {
        onClick() {
            this.value = this.value === 'red' ? 'blue' : 'red';
        },
    },
};
</script>