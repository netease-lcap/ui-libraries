<!-- 和倒计时一起使用 -->
<template>
<u-form ref="form1">
    <!-- 这里之前用中文输入法会导致无法输入，已修复 -->
    <u-form-item label="中文名" name="username" rules="required">
        <u-input v-model="username"></u-input>
    </u-form-item>
    <u-form-item label="倒计时">
        {{ countdown }} 秒后重新获取
    </u-form-item>
</u-form>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            countdown: 600
        };
    },
    mounted() {
        setInterval(() => {
            if (this.countdown === 0) {
                this.countdown = 600;
                return;
            }
            this.countdown--;
        }, 1000);
    },
};
</script>