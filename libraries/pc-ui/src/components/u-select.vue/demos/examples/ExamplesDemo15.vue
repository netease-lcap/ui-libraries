<!-- Tags 风格 -->
<template>
<u-linear-layout>
    <u-select multiple tags-overflow="hidden" v-model="values" :data-source="list" placeholder="过多时省略"></u-select>
    <u-select multiple tags-overflow="collapse" v-model="values" :data-source="list" placeholder="过多时收缩"></u-select>
    <u-select multiple tags-overflow="visible" v-model="values" :data-source="list" placeholder="过多时显示"></u-select>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            values: ['c', 'csharp', 'cpp', 'java', 'go'],
            list: [
                { text: 'Java', value: 'java' },
                { text: 'Node.js', value: 'nodejs' },
                { text: 'Go', value: 'go' },
                { text: 'Python', value: 'python' },
                { text: 'Ruby', value: 'ruby', disabled: true },
                { text: 'C', value: 'c' },
                { text: 'C#', value: 'csharp' },
                { text: 'C++', value: 'cpp' },
                { text: 'PHP', value: 'php', disabled: true },
            ],
        };
    },
};
</script>