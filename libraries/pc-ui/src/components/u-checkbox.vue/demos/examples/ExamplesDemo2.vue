<!-- v-model -->
<template>
<u-checkbox v-model="value" :text="value"></u-checkbox>
</template>
<script>
export default {
    data() {
        return {
            value: true,
        };
    },
};
</script>