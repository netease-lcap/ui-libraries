<!-- 可以重复 -->
<template>
<u-select multiple duplicated v-model="values" :data-source="list"></u-select>
</template>
<script>
export default {
    data() {
        return {
            values: ['c', 'csharp', 'cpp'],
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