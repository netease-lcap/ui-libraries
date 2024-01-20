<!-- 卡牌宽度 -->
<template>
<div>
    <p>samll尺寸</p>
    <u-linear-layout>
        <u-checkbox-card size="small" :data="data"></u-checkbox-card>
    </u-linear-layout>
    <p>默认尺寸</p>
    <u-linear-layout>
        <u-checkbox-card :data="data"></u-checkbox-card>
    </u-linear-layout>
    <p>large尺寸</p>
    <u-linear-layout>
        <u-checkbox-card size="large" :data="data"></u-checkbox-card>
    </u-linear-layout>
    <p>huge尺寸</p>
    <u-linear-layout>
        <u-checkbox-card size="huge" :data="data"></u-checkbox-card>
    </u-linear-layout>
    <p>自适应尺寸</p>
    <u-linear-layout style="width:900px;">
        <u-checkbox-card size="auto" :data="data"></u-checkbox-card>
    </u-linear-layout>
</div>
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