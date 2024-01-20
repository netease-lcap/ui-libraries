<!-- 基本用法 -->
<template>
<u-linear-layout>
    <u-checkbox-card v-model="value" :data="data"></u-checkbox-card>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            value: ['1', '4'],
            data: [{
                text: 'jiande-private',
                value: '1',
            },{
                text: 'jiande-public',
                value: '2',
            },{
                text: 'yiqiao-public',
                value: '3',
            },{
                text: 'liantong-public',
                value: '4',
            },{
                text: 'region-1',
                value: '5',
            }],
        };
    },
};
</script>