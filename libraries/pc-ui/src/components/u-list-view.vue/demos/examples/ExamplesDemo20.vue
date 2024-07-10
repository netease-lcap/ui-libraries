<!-- 后端分页与加载更多 -->
<template>
<u-list-view multiple v-model="values" :setRowStyle="getRowStyle" :data-source="dataSource">
</u-list-view>
</template>
<script>
export default {
    data() {
        return {
            values: ['java', 'nodejs'],
            dataSource: [
                {'text': 'Java', 'value': 'java'},
                {'text': 'Nodejs', 'value': 'nodejs'},
                {'text': 'Go', 'value': 'go'},
            ]
        };
    },
    methods: {
        getRowStyle(current) {
            return current.item.value === 'nodejs' ? {backgroundColor: 'yellowgreen', color: 'red'} : '';
        },
    },
};
</script>