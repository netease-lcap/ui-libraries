<!-- 密码确认场景 -->
<template>
<u-form gap="large">
    <u-form-item label="密码" required rules="required | ^azAZ09_$ | minLength(4)">
        <u-input size="huge medium" type="password" v-model="model.password" maxlength="8" placeholder="以字母、数字或'_'组成"></u-input>
    </u-form-item>
    <u-form-item label="确认密码" required rules="required | confirmed(model.password)">
        <u-input size="huge medium" type="password" v-model="model.confirmedPassword" maxlength="8" placeholder="再次输入密码"></u-input>
    </u-form-item>
</u-form>
</template>
<script>
export default {
    data() {
        return {
            model: {
                password: '',
                confirmedPassword: '',
            },
        };
    },
};
</script>