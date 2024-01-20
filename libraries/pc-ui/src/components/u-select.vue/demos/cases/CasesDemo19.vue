<!-- 选项初始值 -->
<template>
<u-linear-layout>
    <u-select v-model="value" :data="list" filterable clearable placeholder="前端过滤"></u-select>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            value: undefined,
            list: [],
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    const data = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'].map((text) => ({ text, value: text }));

                    res(data);
                }, 100);
            }).then((result) => {
                this.list = result;
                this.value = 'Washington';
            });
        },
    },
};
</script>