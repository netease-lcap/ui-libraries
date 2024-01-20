<!-- 部分选项不可选择 -->
<template>
<u-linear-layout>
    <u-checkbox-card v-model="value" :data="data"></u-checkbox-card>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            value: ['2', '3'],
            data: [{
                text: 'jiande-private',
                value: '1',
            },{
                text: 'jiande-public',
                value: '2',
                disabled: true,
            },{
                text: 'yiqiao-public',
                value: '3',
            },{
                text: 'liantong-public',
                value: '4',
                 disabled: true,
            },{
                text: 'region-1',
                value: '5',
            }],
        };
    },
};
</script>