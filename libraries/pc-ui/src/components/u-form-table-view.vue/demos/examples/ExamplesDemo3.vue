<!-- 动态表格 -->
<template>
<u-form-table-view :data="list" dynamic :get-default-item="getDefaultItem">
    <u-form-table-view-column title="URL" width="20%">
        <template slot="cell" slot-scope="{ item }">
            <u-input size="huge full" v-model="item.url"></u-input>
        </template>
    </u-form-table-view-column>
    <u-form-table-view-column title="服务" width="20%">
        <template slot="cell" slot-scope="{ item }">
            <u-select size="huge full" v-model="item.service" :data="services"></u-select>
        </template>
    </u-form-table-view-column>
    <u-form-table-view-column title="端口" width="20%">
        <template slot="cell" slot-scope="{ item }">
            <u-input size="huge full" v-model="item.port"></u-input>
        </template>
    </u-form-table-view-column>
    <u-form-table-view-column title="描述">
        <template slot="cell" slot-scope="{ item }">
            <u-input size="huge full" v-model="item.description"></u-input>
        </template>
    </u-form-table-view-column>
</u-form-table-view>
</template>
<script>
export default {
    data() {
        return {
            list: [{
                url: 'xxx',
                service: 'abc',
                port: 8000,
                description: '',
            }, {
                url: 'xxx',
                service: 'abc',
                port: 8000,
                description: '',
            }],
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