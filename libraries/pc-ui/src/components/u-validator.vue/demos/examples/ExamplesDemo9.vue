<!-- 动态验证 -->
<template>
<u-form ref="form">
    <u-form-item>
        <u-radios v-model="model.protocol">
            <u-radio label="HTTP">HTTP</u-radio>
            <u-radio label="HTTPS">HTTPS</u-radio>
        </u-radios>
    </u-form-item>
    <u-form-item label="端口" required :rules="portRules">
        <u-input size="huge medium" v-model.number="model.port" maxlength="5" :placeholder="model.protocol === 'HTTP' ? '80或1025-65535内的整数' : '443或1025-65535内的整数'"></u-input>
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
            portRules: [
                'required',
                'integer',
                {
                    trigger: 'blur',
                    validate: (value, rule, options) => {
                        value = +value;
                        if (this.model.protocol === 'HTTP') {
                            if (value === 80 || value >= 1025 && value <= 65535)
                                return true;
                            else
                                return '80或1025-65535内的整数';
                        } else {
                            if (value === 443 || value >= 1025 && value <= 65535)
                                return true;
                            else
                                return '443或1025-65535内的整数';
                        }
                    },
                },
                'unique(existingPortList)',
            ],
        };
    },
    watch: {
        'model.protocol'() {
            this.$nextTick(() => this.$refs.form.validate());
        },
    },
};
</script>