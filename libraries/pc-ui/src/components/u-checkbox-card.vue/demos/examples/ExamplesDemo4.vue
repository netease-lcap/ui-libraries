<!-- 固定每行展示数据个数 -->
<template>
<u-linear-layout>
    <u-checkbox-card :column="3" size="large" :data="data"></u-checkbox-card>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            value: [],
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