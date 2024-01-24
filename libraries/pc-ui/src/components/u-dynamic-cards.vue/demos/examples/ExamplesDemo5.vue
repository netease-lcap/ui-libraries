<!-- 表单验证 -->
<template>
<u-dynamic-cards :data="list" text-field="url" :getDefaultItem="getDefaultItem">
    <template slot-scope="{ item }">
        <u-form-table-view :data="item.list" dynamic :getDefaultItem="getDefaultSubItem">
            <u-form-table-view-column title="URL" width="20%"
                rules="required | pattern(/^[a-zA-Z0-9/\s]+$/)">
                <template slot="cell" slot-scope="{ item: subItem }">
                    <u-input size="huge full" v-model="subItem.url" placeholder="URL"></u-input>
                </template>
            </u-form-table-view-column>
            <u-form-table-view-column title="服务" width="20%"
                rules="required">
                <template slot="cell" slot-scope="{ item: subItem }">
                    <u-select size="huge full" v-model="subItem.service" :data="services" placeholder="服务"></u-select>
                </template>
            </u-form-table-view-column>
            <u-form-table-view-column title="端口" width="20%"
                rules="required | integer | range(1,65535)">
                <template slot="cell" slot-scope="{ item: subItem }">
                    <u-input size="huge full" v-model="subItem.port" placeholder="端口"></u-input>
                </template>
            </u-form-table-view-column>
            <u-form-table-view-column title="描述">
                <template slot="cell" slot-scope="{ item: subItem }">
                    <u-input size="huge full" v-model="subItem.description" placeholder="描述"></u-input>
                </template>
            </u-form-table-view-column>
        </u-form-table-view>
    </template>
</u-dynamic-cards>
</template>
<script>
export default {
    data() {
        return {
            list: [],
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
                domain: '',
                list: [],
            };
        },
        getDefaultSubItem() {
            return {
                url: '',
                service: this.services[0].value,
                port: '',
                description: '',
            };
        },
    },
};
</script>