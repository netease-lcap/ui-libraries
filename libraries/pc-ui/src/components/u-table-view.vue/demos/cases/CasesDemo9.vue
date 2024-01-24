<!-- 默认多行显示 -->

<template>
  <div><u-table-view line="horizontal" striped :data="[
    { id: 1, name: '张三张三张三张三张三张三张三张三张三张三', address: '浙江省杭州市滨江区网商路599号网易大厦', birthday: '19910528' },
    { id: 2, name: '小明', address: '浙江省杭州市滨江区江虹路459号英飞特科技园浙江省杭州市滨江区江虹路459号英飞特科技园浙江省杭州市滨江区江虹路459号英飞特科技园', birthday: '19920914' },
    { id: 3, name: '李四李四李四李四李四李四李四李四李四李四', address: '浙江省杭州市滨江区秋溢路606号西可科技园', birthday: '19900228' },
    { id: 4, name: '李华', address: '浙江省杭州市滨江区长河路590号东忠科技园', birthday: '19891210' },
    { id: 5, name: '王五', address: '浙江省杭州市滨江区网商路599号网易大厦二期', birthday: '19930716' },
]">
    <u-table-view-column title="序号" field="id" width="10%"></u-table-view-column>
    <u-table-view-column title="姓名" field="name" width="20%"></u-table-view-column>
    <u-table-view-column title="地址" field="address"></u-table-view-column>
    <u-table-view-column title="出生日期" field="birthday" width="20%"></u-table-view-column>
</u-table-view></div>
</template>