<!-- 可取消 -->
<template>
<u-grid-layout :repeat="3">
    <u-grid-layout-column>
        <u-grid-view v-model="value" :data-source="list" cancelable></u-grid-view>
    </u-grid-layout-column>
    <u-grid-layout-column :span="2">
        <div :class="$style.result">选择的语言为：{{ value }}</div>
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
<style module>
.result {
    height: var(--list-view-height);
    padding: var(--list-view-item-padding);
    border: var(--border-width-base) solid var(--border-color-base);
    color: var(--color-light);
}
</style>