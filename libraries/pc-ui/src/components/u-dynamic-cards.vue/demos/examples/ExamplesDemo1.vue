<!-- 基本用法 -->
<template>
<u-dynamic-cards :data="list" text-field="url" :getDefaultItem="getDefaultItem">
    <template slot-scope="{ item }">
        <u-linear-layout>
            <u-input size="huge normal" v-model="item.url" placeholder="URL"></u-input>
            <u-select size="huge normal" v-model="item.service" :data="services"></u-select>
            <u-input size="huge normal" v-model.number="item.port" placeholder="端口"></u-input>
        </u-linear-layout>
    </template>
</u-dynamic-cards>
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
                url: '222',
                service: 'def',
                port: 2000,
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
                url: '',
                service: '',
                port: '',
                description: '',
            };
        },
    },
};
</script>