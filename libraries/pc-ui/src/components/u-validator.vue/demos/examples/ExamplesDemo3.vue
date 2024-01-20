<!-- 验证唯一性 -->
<template>
<u-form-item label="端口" required rules="required | integer | range(80, 65535) | unique(existingPortList)">
    <u-input v-model.number="model.port" maxlength="5" placeholder="80-65535内的整数"></u-input>
</u-form-item>
</template>
<script>
export default {
    data() {
        return {
            model: {
                port: '',
            },
            existingPortList: [8000, 3306, 65535],
        };
    },
};
</script>