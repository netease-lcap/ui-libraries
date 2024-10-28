<!-- loadTo -->
<template>
<u-linear-layout direction="vertical">
    <u-linear-layout>
        <u-number-input v-model="pageTo"></u-number-input>
        <u-button @click="loadTo">loadTo刷新</u-button>
    </u-linear-layout>
    <u-list-view :data-source="load" pageable :page-size="20" style="height: 182px" :showJumper="true" ref="listview"></u-list-view>
</u-linear-layout>
</template>
<script>
// 模拟构造远程数据
const remoteData = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'].map((text) => ({ text, value: text }));

export default {
    data() {
        return {
            pageTo: null,
        };
    },
    methods: {
        load(paging) {
            console.log('paging', paging);
            // 这里使用 Promise 和 setTimeout 模拟一个异步请求
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(remoteData);
                }, 500);
            });
        },
        loadTo() {
            console.log('loadTo');
            this.$refs.listview.loadTo(this.pageTo);
        },
    },
};
</script>