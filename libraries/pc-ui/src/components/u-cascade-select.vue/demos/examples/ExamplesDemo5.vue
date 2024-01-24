<!-- join -->
<template>
<u-linear-layout direction="vertical">
    <u-cascade-select :value.sync="value" converter="join.number:|" :categories="[
        { label: 'CPU', key: 'cpu' },
        { label: '内存', key: 'memory' },
        { label: '系统盘', key: 'storage' },
    ]" :data="data">
    </u-cascade-select>
    <div>选择的值为：{{ value }}</div>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            value: undefined,
            data: [
                { text: '1核', value: 1, children: [
                    { text: '1GB', value: 1, children: [
                        { text: '20GB', value: 20 },
                    ] },
                    { text: '2GB', value: 2, children: [
                        { text: '20GB', value: 20 },
                    ] },
                ] },
                { text: '2核', value: 2, children: [
                    { text: '2GB', value: 2, children: [
                        { text: '20GB', value: 20 },
                    ] },
                    { text: '4GB', value: 4, children: [
                        { text: '20GB', value: 20 },
                    ] },
                    { text: '8GB', value: 8, children: [
                        { text: '20GB', value: 20 },
                    ] },
                ] },
                { text: '4核', value: 4, children: [
                    { text: '4GB', value: 4, children: [
                        { text: '20GB', value: 20 },
                    ] },
                    { text: '8GB', value: 8, children: [
                        { text: '20GB', value: 20 },
                    ] },
                    { text: '16GB', value: 16, children: [
                        { text: '20GB', value: 20 },
                    ] },
                ] },
            ],
        };
    },
};
</script>