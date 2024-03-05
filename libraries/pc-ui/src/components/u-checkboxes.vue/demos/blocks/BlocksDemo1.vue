<!-- 基础用法 -->

<!--
<template>
  <u-checkboxes>
    <template #item="current"></template>
  </u-checkboxes>
</template>
-->

<template>
  <div>

    <u-checkboxes checkAll checkAllDisplay="inline" v-model="checkedList1">
      <u-checkbox label="水杯">水杯</u-checkbox>
      <u-checkbox label="坚果">坚果</u-checkbox>
      <u-checkbox label="毛巾">毛巾</u-checkbox>
      <u-checkbox label="沙发">沙发</u-checkbox>
      <u-checkbox label="沙发">沙发</u-checkbox>
      <u-checkbox label="沙发">沙发</u-checkbox>
      <u-checkbox label="沙发">沙发</u-checkbox>
    </u-checkboxes>
    <hr/>
    <u-checkboxes checkAll checkAllDisplay="block" v-model="checkedList2">
      <u-checkbox label="水杯">水杯</u-checkbox>
      <u-checkbox label="坚果">坚果</u-checkbox>
      <u-checkbox label="毛巾">毛巾</u-checkbox>
      <u-checkbox label="沙发">沙发</u-checkbox>
      <u-checkbox label="沙发">沙发</u-checkbox>
      <u-checkbox label="沙发">沙发</u-checkbox>
      <u-checkbox label="沙发">沙发</u-checkbox>
      <u-checkbox label="沙发">沙发</u-checkbox>
    </u-checkboxes>
    <hr />
    <p>{{ checkedList1 }}</p>
    <p>{{ checkedList2 }}</p>

  </div>
</template>

<script>
export default {
    data() {
        return {
          checkedList2: [],
          checkedList1: [],
        };
    },
    methods: {

    },
};
</script>