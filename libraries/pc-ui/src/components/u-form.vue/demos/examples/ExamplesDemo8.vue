<!-- 表单验证 -->
<template>
<u-form ref="form" gap="large">
    <u-form-item label="计费方式" required>
        <u-radios v-model="model.chargeType">
            <u-radio label="0">包年包月</u-radio>
            <u-radio label="1">按量付费</u-radio>
        </u-radios>
    </u-form-item>
    <u-form-item label="实例名称" required rules="required | ^az | az09$ | ^az09-$ | rangeLength(1,63)" validateMessage="错误">
        <u-input v-model="model.name" size="huge" maxlength="63" placeholder="由1-63个小写字母，数字，中划线组成，以字母开头，字母或数字结尾"></u-input>
    </u-form-item>
    <u-form-item label="规格">
        <u-capsules v-model="model.spec">
            <u-capsule value="0101">1核 1GB</u-capsule>
            <u-capsule value="0102">1核 2GB</u-capsule>
            <u-capsule value="0204">2核 4GB</u-capsule>
            <u-capsule value="0408">4核 8GB</u-capsule>
            <u-capsule value="0816">8核 16GB</u-capsule>
            <u-capsule value="0832">8核 32GB</u-capsule>
            <u-capsule value="1664">16核 64GB</u-capsule>
        </u-capsules>
    </u-form-item>
    <u-form-item label="类型" description="高性能 SSD 云盘不支持快照功能" layout="block">
        <u-capsules v-model="model.type">
            <u-capsule value="SSD">SSD 云盘</u-capsule>
            <u-capsule value="HSSD">高性能 SSD 云盘</u-capsule>
        </u-capsules>
    </u-form-item>
    <u-form-item label="端口号" required rules="required | integer | range(1150,65535)">
        <u-input v-model.number="model.port" size="huge normal" maxlength="5" placeholder="1150-65535"></u-input>
    </u-form-item>
    <u-form-item label="公网带宽">
        <u-combo-slider v-model="model.bandwidth" :step="10" unit="Mbps"></u-combo-slider>
    </u-form-item>
    <u-form-item label="描述" layout="block" rules="minLength(8)">
        <u-textarea v-model="model.description" size="huge"></u-textarea>
    </u-form-item>
    <u-form-item>
        <u-button color="primary" @click="submit">立即创建</u-button>
    </u-form-item>
</u-form>
</template>
<script>
export default {
    data() {
        return {
            model: {
                chargeType: '0',
                name: '',
                spec: '0101',
                type: 'SSD',
                port: '',
                bandwidth: 10,
                description: '',
            },
        };
    },
    methods: {
        async submit() {
            const result = await this.$refs.form.validate();
            if (result.valid)
                this.$toast.show('验证通过，提交成功！');
            else
                this.$toast.show('验证失败！');
        },
    },
};
</script>