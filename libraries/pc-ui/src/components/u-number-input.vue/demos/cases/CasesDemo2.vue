<!-- 键盘事件 -->
<template>
    <u-number-input v-model="value" @keydown="handleKeydown" @keyup="handleKeyup"></u-number-input>
</template>
<script>
export default {
    data() {
        return {
            value: '',
        };
    },
    methods: {
        handleKeydown(e, sender) {
            console.log('keydown', e, sender);
        },
        handleKeyup(e, sender) {
            console.log('keyup', e, sender);
        },
    },
};
</script>