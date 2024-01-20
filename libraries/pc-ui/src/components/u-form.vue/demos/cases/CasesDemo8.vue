<!-- 表单项必填标记位置 -->
<template>
<u-form ref="form1">
    <u-form-item label="用户名" name="username" rules="required | rangeLength(4, 12)" required-position="left">
        <u-input v-model="model.username" maxlength="12" placeholder="4~12个字符"></u-input>
    </u-form-item>
    <u-form-item>
        <u-button color="primary" @click="submit()">提交</u-button>
    </u-form-item>
</u-form>
</template>

<script>
export default {
    data() {
        return {
            canSubmit: false,
            model: {
                username: '',
            },
        };
    },
    mounted() {
        // 必须初始化时或在获取数据到时安静验证一次
        this.$refs.form1.validate(true);

        // 在获取数据到时如下
        // this.getData().then(...)
        //  .then(() => this.$refs.form1.validate(true))
    },
    methods: {
        async submit() {
            const result = await this.$refs.form1.validate();
            if (result.valid)
                alert('提交成功');
        },
    },
};
</script>