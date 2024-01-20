<!-- 混合编写 -->
<template>
<u-form-item label="用户名" required :rules="nameRules">
    <u-input maxlength="12" placeholder="4-12个字符"></u-input>
</u-form-item>
</template>
<script>
export default {
    data() {
        return {
            nameRules: [
                'required | ^azAZ | ^azAZ09-$ | azAZ09$ | minLength(4)',
                { message: '该用户名已经存在', trigger: 'blur', validate(value, rule, options) {
                    return new Promise((resolve, reject) => {
                        // 这里模拟一个异步请求
                        setTimeout(() => {
                            resolve(!['abcd', 'aaaa', 'ABCD'].includes(value));
                        }, 200);
                    });
                } },
            ],
        };
    },
};
</script>