<!-- 多项选择 -->
<template>
<u-select multiple v-model="values" title="多选列表" :data-source="list"></u-select>
</template>
<script>
export default {
    data() {
        return {
            values: ['c', 'cpp'],
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