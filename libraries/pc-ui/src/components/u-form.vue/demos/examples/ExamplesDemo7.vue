<!-- 数据转换 -->
<template>
<u-form gap="large">
    <u-form-item label="超时时长" required>
        <u-input size="huge normal" maxlength="5" placeholder="300-10000"
            :value="model.timeout / 1000" @input="model.timeout = $event * 1000"></u-input>
    </u-form-item>
    <u-form-item label="端口号" required>
        <u-input v-model.number="model.port" size="huge normal" maxlength="5" placeholder="1150-65535"></u-input>
    </u-form-item>
    <u-form-item>
        <u-button color="primary" @click="submit()">立即创建</u-button>
    </u-form-item>
</u-form>
</template>
<script>
export default {
    data() {
        return {
            model: {
                timeout: 900000,
                port: '',
            },
        };
    },
    methods: {
        submit() {
            console.log(this.model);
            this.$toast.show('没有验证，直接提交成功！');
        },
    },
};
</script>