<!-- 使用 Option -->
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
    subscribe: {
        someTopic(value) {
            this.received = value;
        },
    },
};
</script>
<style module>
.root {
    color: white;
    padding: 10px;
}
</style>