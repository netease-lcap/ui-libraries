<!-- Tags 展示icon -->
<template>
<u-linear-layout>
    <u-select multiple tags-overflow="hidden" v-model="values" :data-source="list" placeholder="过多时省略" iconField="picture"></u-select>
    <u-select multiple tags-overflow="collapse" v-model="values" :data-source="list" placeholder="过多时收缩" iconField="picture"></u-select>
    <u-select multiple tags-overflow="visible" v-model="values" :data-source="list" placeholder="过多时显示" iconField="picture"></u-select>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            values: ['c', 'csharp', 'cpp', 'java', 'go'],
            list: [
                { text: 'Java', value: 'java', picture: 'http://ceph.lcap.hatest.163yun.com/lcap-test-static/icon/p1.jpg' },
                { text: 'Node.js', value: 'nodejs', picture: ''},
                { text: 'Go', value: 'go' },
                { text: 'Python', value: 'python' },
                { text: 'Ruby', value: 'ruby', disabled: true },
                { text: 'C', value: 'c', picture: 'https://t7.baidu.com/it/u=1831997705,836992814&fm=193&f=GIF' },
                { text: 'C#', value: 'csharp' },
                { text: 'C++', value: 'cpp' },
                { text: 'PHP', value: 'php', disabled: true },
            ],
        };
    },
};
</script>