<!-- 自定义操作列 -->
<template>
<u-form-table-view ref="formTable" :data="list" :showAddButton="false" dynamic :get-default-item="getDefaultItem"
    :lastColumnStyle="{ width: '80px' }">
    <u-form-table-view-column title="URL" width="20%"
        rules="required | pattern(/^[a-zA-Z0-9/\s]+$/)">
        <template slot="cell" slot-scope="{ item }">
            <u-input size="huge full" v-model="item.url"></u-input>
        </template>
    </u-form-table-view-column>
    <u-form-table-view-column title="服务" width="20%"
        rules="required">
       <template slot="cell" slot-scope="{ item }">
            <u-input size="huge full" v-model="item.service"></u-input>
        </template>
    </u-form-table-view-column>
    <u-form-table-view-column title="端口" width="20%"
        rules="required | integer | range(1,65535)">
        <template slot="cell" slot-scope="{ item }">
            <u-input size="huge full" v-model="item.port"></u-input>
        </template>
    </u-form-table-view-column>
    <u-form-table-view-column title="描述">
         <template slot="cell" slot-scope="{ item }">
            <u-input size="huge full" v-model="item.description"></u-input>
        </template>
    </u-form-table-view-column>
    <template slot="last-column" slot-scope="{ item, rowIndex }">
        <u-linear-layout gap="small">
            <u-link size="huge full" @click="duplicate(rowIndex)">复制</u-link>
            <u-link size="huge full" @click="remove(rowIndex)">删除</u-link>
        </u-linear-layout>
    </template>
    <u-button icon="plus" :style="{ marginTop: '10px' }" @click="add">添加</u-button>
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
        remove(rowIndex) {
            this.$refs.formTable.remove(rowIndex);
        },
        duplicate(rowIndex) {
            this.$refs.formTable.duplicate(rowIndex);
        },
        add() {
            this.$refs.formTable.add();
        },
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