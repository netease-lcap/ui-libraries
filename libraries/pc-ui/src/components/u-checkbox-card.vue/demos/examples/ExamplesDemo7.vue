<!-- 自定义placeholder -->
<template>
<u-linear-layout>
    <u-checkbox-card v-model="value" :data="data">
        <p style="margin: 0px;" slot="placeholder">自定义placeholder内容</p>
    </u-checkbox-card>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            value: [],
            data: [],
        };
    },
};
</script>