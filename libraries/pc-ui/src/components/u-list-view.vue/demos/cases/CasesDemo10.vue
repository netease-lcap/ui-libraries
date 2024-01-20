<!-- 多选时验证 -->
<template>
<u-validator :rules="rules">
    <u-list-view v-model="test" multiple>
        <u-list-view-item>AAA</u-list-view-item>
        <u-list-view-item>BBB</u-list-view-item>
        <u-list-view-item>CCC</u-list-view-item>
    </u-list-view>
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