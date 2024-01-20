<!-- 只读状态、禁用状态、禁用某一项 -->
<template>
<u-grid-layout :repeat="3">
    <u-grid-layout-column>
        <u-list-view v-model="value" :data-source="list" readonly></u-list-view>
    </u-grid-layout-column>
    <u-grid-layout-column>
        <u-list-view v-model="value" :data-source="list" disabled></u-list-view>
    </u-grid-layout-column>
    <u-grid-layout-column>
        <u-list-view v-model="value" :data-source="list"></u-list-view>
    </u-grid-layout-column>
</u-grid-layout>
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