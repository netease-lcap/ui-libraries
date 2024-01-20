<!-- 动态验证 -->
<template>
<u-form ref="form">
    <u-form-item>
        <u-radios v-model="model.protocol">
            <u-radio label="HTTP">HTTP</u-radio>
            <u-radio label="HTTPS">HTTPS</u-radio>
        </u-radios>
    </u-form-item>
    <u-form-item label="端口" required :rules="model.protocol === 'HTTP' ?
        'required | integer | range(80, 65535) | unique(existingPortList)' :
        'required | integer | range(443, 65535) | unique(existingPortList)'">
        <u-input size="huge medium" v-model.number="model.port" maxlength="5" :placeholder="model.protocol === 'HTTP' ? '80-65535内的整数' : '443-65535内的整数'"></u-input>
    </u-form-item>
</u-form>
</template>
<script>
export default {
    data() {
        return {
            model: {
                protocol: 'HTTP',
                port: '',
            },
            existingPortList: [8000, 3306, 65535],
        };
    },
};
</script>