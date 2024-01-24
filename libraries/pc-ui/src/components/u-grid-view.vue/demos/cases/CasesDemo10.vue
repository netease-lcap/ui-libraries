<!-- 多选时验证 -->
<template>
<u-validator :rules="rules">
    <u-grid-view v-model="test" multiple>
        <u-grid-view-item>AAA</u-grid-view-item>
        <u-grid-view-item>BBB</u-grid-view-item>
        <u-grid-view-item>CCC</u-grid-view-item>
    </u-grid-view>
</u-validator>
</template>
<script>
export default {
    data() {
        return {
            test: [],
            rules: [
                { required: true, trigger: 'input', validator(rule, value, cb) {
                    cb();
                } },
            ],
        };
    },
    methods: {
        onClick() {
            this.test = this.data;
        },
    },
};
</script>