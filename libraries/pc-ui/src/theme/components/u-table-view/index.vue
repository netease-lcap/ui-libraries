<!-- 前端分页 -->
<template>
  <u-table-view :data-source="data" pageable :page-size="10" show-sizer stripe>
    <u-table-view-column title="用户名" field="name" width="15%"></u-table-view-column>
    <u-table-view-column title="手机号码" field="phone" width="20%"></u-table-view-column>
    <u-table-view-column title="地址" field="address"></u-table-view-column>
    <u-table-view-column
      title="最近登录时间"
      field="loginTime"
      formatter="placeholder | date"
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
      name: '张三',
      phone: '186****7895',
      email: 'zhangsan@163.com',
      address: '浙江省杭州市滨江区****',
      createdTime: 1464421931000,
      loginTime: 1527515531000,
    },
    {
      name: '小明',
      phone: '137****0283',
      email: 'xiaoming@163.com',
      address: '浙江省杭州市滨江区****',
      createdTime: 1520864676000,
      loginTime: 1552400676000,
    },
    {
      name: '李四',
      phone: '188****7809',
      email: 'lisi@163.com',
      address: '浙江省杭州市滨江区****',
      createdTime: 1494488730000,
      loginTime: 1558165530000,
    },
    {
      name: '李华',
      phone: '187****1214',
      email: 'lihua@163.com',
      address: '浙江省杭州市滨江区****',
      createdTime: 1476073921000,
      loginTime: 1544428081000,
    },
    {
      name: '王五',
      phone: '135****0020',
      email: 'wangwu@163.com',
      address: '浙江省杭州市滨江区****',
      createdTime: 1468614726000,
      loginTime: 1531675926000,
    },
  ];

  const result = [];
  for (let i = 0; i < 75; i++) {
    const item = Object.assign({}, baseData[i % 5]);
    item.name += '-' + ((Math.random() * 20) >> 0);
    item.createdTime += i * 1000 * 3600 * 24;
    item.loginTime += i * 1000 * 3600 * 24;
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
