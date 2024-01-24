<template>
  <demo-section>
    <demo-block title="基础用法--单日期">
      <van-cell>
        <template #title>
          <span>日期选择</span>
        </template>
        <van-calendar
          :value.sync="date1"
          :min-date="min"
          :max-date="end"
          title="选择日期"
          @confirm="onConfirm1"
          @select="onSelect1"
        ></van-calendar>
      </van-cell>
    </demo-block>

    <demo-block title="全量渲染节点">
      <van-cell>
        <template #title>
          <span>日期选择</span>
        </template>
        <van-calendar
          :min-date="min"
          :max-date="end"
          title="选择日期"
          :lazyRender="false"
        ></van-calendar>
      </van-cell>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      min: '1900-01-01',
      max: '2050-12-31',

      date1: '2023-10-11',

      start: null,
      end: null,

    };
  },

  methods: {
    onSelect1(date) {
      console.log('onSelect1 date: ', date);
      console.log('date1: ', this.date1);
    },
    onConfirm1(date) {
      console.log('onConfirm1 date: ', date);
      console.log('date1: ', this.date1);
    }
  },
};
</script>
