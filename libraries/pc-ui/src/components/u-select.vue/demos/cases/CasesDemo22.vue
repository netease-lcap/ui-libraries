<!-- 清除缓存 -->
<template>
<u-linear-layout>
    <u-select ref="select" :data-source="load" filterable clearable :page-size="20" placeholder="前端过滤"></u-select>
    <u-button @click="reload">重新加载</u-button>
</u-linear-layout>
</template>
<script>

export default {
    data() {
        return {
            reverse: false,
        };
    },
    methods: {
        load() {
            // 模拟构造后端数据
            const remoteData = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'].map((text) => ({ text, value: text }));
            if (this.reverse)
                remoteData.reverse();

            // 这里使用 Promise 和 setTimeout 模拟一个异步请求
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(remoteData);
                }, 300);
            });
        },
        reload() {
            this.reverse = true;
            this.$refs.select.reload();
        },
    },
};
</script>