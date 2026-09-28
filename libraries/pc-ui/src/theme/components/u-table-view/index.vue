<!-- 前端分页 -->
<template>
  <u-table-view :data-source="data" pageable :page-size="10" show-sizer stripe>
    <u-table-view-column title="列1" field="col1" width="15%"></u-table-view-column>
    <u-table-view-column title="列2" field="col2" width="20%"></u-table-view-column>
    <u-table-view-column title="列3" field="col3" width="20%"></u-table-view-column>
    <u-table-view-column
      title="列4"
      field="col4"
      width="20%"></u-table-view-column>
  </u-table-view>
</template>
<script>
// 模拟后端请求
const mockRequest = (data, timeout = 300) => new Promise((res, rej) => setTimeout(() => res(data), timeout));
// 模拟构造 75 条后端数据
const mockData = (() => {
  const baseData = [
    {
      col1: '内容 A',
      col2: '内容 B',
      col3: '内容 C',
      col4: 1464421931000,
    },
    {
      col1: '内容 D',
      col2: '内容 E',
      col3: '内容 F',
      col4: 1520864676000,
    },
    {
      col1: '内容 G',
      col2: '内容 H',
      col3: '内容 I',
      col4: 1494488730000,
    },
    {
      col1: '内容 J',
      col2: '内容 K',
      col3: '内容 L',
      col4: 1476073921000,
    },
    {
      col1: '内容 M',
      col2: '内容 N',
      col3: '内容 O',
      col4: 1468614726000,
    },
  ];

  const result = [];
  for (let i = 0; i < 75; i++) {
    const item = Object.assign({}, baseData[i % 5]);
    item.col1 += '-' + ((Math.random() * 20) >> 0);
    item.col4 += i * 1000 * 3600 * 24;
    result.push(item);
  }

  return result;
})();

export default {
  data() {
    return {
      data: mockData,
    };
  },
};
</script>
