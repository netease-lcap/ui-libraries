<!-- 使用方法 -->
<template>
<div :class="$style.root" :style="{ background: received }">{{ String(received) }}</div>
</template>
<script>
import { MSubscriber } from 'cloud-ui.vusion';

export default {
    mixins: [MSubscriber],
    data() {
        return {
            received: undefined,
        };
    },
    created() {
        this.$subscribe('color', (value) => {
            this.received = value;
        });
    },
};
</script>
<style module>
.root {
    color: white;
    padding: 10px;
}
</style>