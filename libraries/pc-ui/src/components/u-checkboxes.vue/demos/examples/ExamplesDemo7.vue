<!-- 数量限制 -->
<template>
<div>
    <u-checkboxes :min="1" :max="2" v-model="checkedList">
        <u-checkbox label="水杯">水杯</u-checkbox>
        <u-checkbox label="坚果">坚果</u-checkbox>
        <u-checkbox label="毛巾">毛巾</u-checkbox>
        <u-checkbox label="沙发">沙发</u-checkbox>
    </u-checkboxes>
    {{ checkedList }}
</div>
</template>
<script>
export default {
    data() {
        return {
            checkedList: ['毛巾', '沙发'],
        };
    },
    methods: {
        add() {
            this.checkedList.push('水杯');
        },
    },
};
</script>