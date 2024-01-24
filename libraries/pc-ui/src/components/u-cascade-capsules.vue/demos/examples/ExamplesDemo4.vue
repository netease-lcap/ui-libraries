<!-- last-value -->
<template>
<u-linear-layout direction="vertical">
    <u-cascade-capsules converter="last-value" v-model="value" :categories="[
        { label: '学科门类' },
        { label: '一级学科' },
        { label: '二级学科' },
    ]" :data="[
        { text: '理学', value: '1', children: [
            { text: '物理学', value: '11', children: [
                { text: '理论物理', value: '111' },
                { text: '凝聚态物理', value: '112' },
                { text: '材料物理', value: '113' },
            ]},
            { text: '数学', value: '12', children: [
                { text: '基础数学', value: '121' },
                { text: '计算数学', value: '122' },
                { text: '应用数学', value: '123' },
            ]},
            { text: '化学', value: '13' },
        ]},
        { text: '工学', value: '2', children: [
            { text: '计算机科学与技术', value: '21', children: [
                { text: '计算机系统结构', value: '211' },
                { text: '计算机软件与理论', value: '212', disabled: true },
                { text: '计算机应用技术', value: '213' },
            ]},
            { text: '软件工程', value: '22', disabled: true },
            { text: '机械工程', value: '23', children: [
                { text: '机械制造及其自动化', value: '231' },
                { text: '机械电子工程', value: '232' },
                { text: '机械设计及理论', value: '233', disabled: true },
                { text: '车辆工程', value: '234', disabled: true },
            ]},
        ]},
    ]">
    </u-cascade-capsules>
    <div>选择的值为：{{ value }}</div>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            value: '213',
        };
    },
};
</script>