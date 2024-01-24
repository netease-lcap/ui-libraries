<!-- 自动选择 -->

<template>
  <div><u-cascade-capsules converter="join.number" :auto-select="false" :categories="[
    { label: 'CPU', key: 'cpu' },
    { label: '内存', key: 'memory' },
    { label: '系统盘', key: 'storage' },
]" :data="[
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
]">
</u-cascade-capsules></div>
</template>