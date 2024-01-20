<!-- 表单验证 -->
<template>
<u-dynamic-cards :data="list" text-field="url" :getDefaultItem="getDefaultItem">
    <template slot-scope="{ item }">
        <u-validator>
            <u-linear-layout>
                <u-validator label="URL" rules="required | pattern(/^[a-zA-Z0-9/\s]+$/)" muted="message">
                    <u-input size="huge normal" v-model="item.url" placeholder="URL"></u-input>
                </u-validator>
                <u-validator label="服务" rules="required" muted="message">
                    <u-select size="huge normal" v-model="item.service" disabled></u-select>
                </u-validator>
                <u-validator label="端口" rules="required | integer | range(1,65535)" muted="message">
                    <u-input size="huge normal" v-model.number="item.port" placeholder="端口"></u-input>
                </u-validator>
            </u-linear-layout>
        </u-validator>
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
                url: '',
                service: '',
                port: '',
                description: '',
            };
        },
    },
};
</script>