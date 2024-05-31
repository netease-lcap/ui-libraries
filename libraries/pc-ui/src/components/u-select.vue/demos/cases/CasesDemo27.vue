<!-- 后端过滤，后端分页 -->
<template>
  <u-linear-layout>
    <u-select
      :data-source="load"
      pageable
      remote-paging
      v-model="value"
      filterable
      remote-filtering
      clearable
      placeholder="后端过滤，后端分页">
    </u-select>
    <u-select
      multiple
      :data-source="load"
      pageable
      remote-paging
      filterable
      remote-filtering
      clearable
      placeholder="后端过滤，后端分页（多选）"
      style="width: 240px"></u-select>
  </u-linear-layout>
</template>
<script>
// 模拟构造数量较多的 500 条后端数据
let remoteData = [];
for (let i = 1; i <= 500; i++) {
  remoteData.push('item' + i);
  remoteData.push('info' + i);
  remoteData.push('detail' + i);
}
remoteData = remoteData.map((text) => ({ text, value: text }));

export default {
  data() {
    return {
      value: 'item33',
    };
  },
  methods: {
    load({ filterText, paging, filterValue }) {
      // const value = filterText.toLowerCase();
      console.log(filterText, paging?.offset, paging.limit, 'paging');
      // 这里使用 Promise 和 setTimeout 模拟一个异步请求
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (filterValue) {
            console.log(filterValue, 'filterValue');
            resolve({
              data: [
                {
                  text: 'item33',
                  value: 'item33',
                },
              ],
              total: 500,
            });
          }
          resolve({
            data: remoteData
              // .filter((item) => item.value.includes(value))
              .slice(paging.offset, paging.offset + paging.limit),
            total: 500,
          });
        }, 300);
      });
    },
  },
};
</script>
