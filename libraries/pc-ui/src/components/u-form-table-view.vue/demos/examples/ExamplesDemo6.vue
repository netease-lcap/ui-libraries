<!-- 表单验证 -->
<template>
<u-form-table-view :data="[{}]" :getDefaultItem="getDefaultItem">
    <u-form-table-view-column title="URL" width="20%"
        rules="required | pattern(/^[a-zA-Z0-9/\s]+$/)">
        <template #cell>
            <u-input size="huge full" v-model="cluster.url"></u-input>
        </template>
    </u-form-table-view-column>
    <u-form-table-view-column title="服务" width="20%"
        rules="required">
        <template #cell>
            <u-select size="huge full" v-model="cluster.service" :data="services"></u-select>
        </template>
    </u-form-table-view-column>
    <u-form-table-view-column title="端口" width="20%"
        rules="required | integer | range(1,65535)">
        <template #cell>
            <u-input size="huge full" v-model.number="cluster.port"></u-input>
        </template>
    </u-form-table-view-column>
    <u-form-table-view-column title="描述">
        <template #cell>
            <u-input size="huge full" v-model="cluster.description"></u-input>
        </template>
    </u-form-table-view-column>
</u-form-table-view>
</template>
<script>
export default {
    data() {
        return {
            cluster: {
                url: 'xxx',
                service: 'abc',
                port: 8000,
                description: '',
            },
            services: [
                { text: 'abc', value: 'abc' },
                { text: 'def', value: 'def' },
                { text: 'zzz', value: 'zzz' },
            ],
        };
    },
    methods: {
        getDefaultItem() {
            return {
                url: 'xxx',
                service: this.services[0].value,
                port: undefined,
                description: '',
            };
        },
    },
};
</script>