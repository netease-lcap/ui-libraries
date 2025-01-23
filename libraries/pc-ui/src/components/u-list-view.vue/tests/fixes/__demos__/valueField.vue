<template>
    <u-linear-layout direction="vertical">
        <u-list-view
            ref="listview"
            v-model="value"
            :data-source="initialList">
        </u-list-view>
    </u-linear-layout>
</template>
<script>
export default {
    data() {
        return {
            value: 'c',
            initialList: [
                { text: 'Batch', value: 0 },
                { text: 'C', value: 'c' }
            ],
        };
    },
    methods: {
    }
};
</script>