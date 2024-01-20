<!-- 可清除 -->
<template>
<u-linear-layout>
    <u-select v-model="value" :data-source="list" clearable></u-select>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            value: 'nodejs',
            list: [
                { text: 'Java', value: 'java' },
                { text: 'Node.js', value: 'nodejs' },
                { text: 'Go', value: 'go' },
                { text: 'Python', value: 'python' },
                { text: 'Ruby', value: 'ruby', disabled: true },
                { text: 'C#', value: 'csharp' },
                { text: 'PHP', value: 'php', disabled: true },
            ],
        };
    },
};
</script>