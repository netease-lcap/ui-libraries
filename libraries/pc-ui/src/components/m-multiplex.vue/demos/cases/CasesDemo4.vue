<!-- selected 双向绑定 -->
<template>
<m-multiplex>
    <m-multiplex-item v-for="item in list"
        :key="item.value" :value="item.value" :selected.sync="item.selected">
        {{ item.text }}</m-multiplex-item>
</m-multiplex>
</template>
<script>
export default {
    data() {
        return {
            list: [
                { text: '水杯', value: 'cup', selected: false },
                { text: '咖啡', value: 'coffee', selected: false },
                { text: '坚果', value: 'nut', selected: true },
                { text: '毛巾', value: 'towel', selected: true },
                { text: '沙发', value: 'sofa', selected: false },
            ],
        };
    },
};
</script>