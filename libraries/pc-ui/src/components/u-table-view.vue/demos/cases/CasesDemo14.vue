<!-- 固定列 -->

<template>
  <u-linear-layout direction="vertical">
    <u-table-view striped :data="[
      { id: 1, name: '张三', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦', birthday: '19910528' },
      { id: 2, name: '小明', province: '浙江省', city: '杭州市', district: '滨江区', address: '江虹路459号英飞特科技园', birthday: '19920914' },
      { id: 3, name: '李四', province: '浙江省', city: '杭州市', district: '滨江区', address: '秋溢路606号西可科技园', birthday: '19900228' },
      { id: 4, name: '李华', province: '浙江省', city: '杭州市', district: '滨江区', address: '长河路590号东忠科技园', birthday: '19891210' },
      { id: 5, name: '王五', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦二期', birthday: '19930716' },
      { id: 1, name: '张三', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦', birthday: '19910528' },
      { id: 2, name: '小明', province: '浙江省', city: '杭州市', district: '滨江区', address: '江虹路459号英飞特科技园', birthday: '19920914' },
      { id: 3, name: '李四', province: '浙江省', city: '杭州市', district: '滨江区', address: '秋溢路606号西可科技园', birthday: '19900228' },
      { id: 4, name: '李华', province: '浙江省', city: '杭州市', district: '滨江区', address: '长河路590号东忠科技园', birthday: '19891210' },
      { id: 5, name: '王五', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦二期', birthday: '19930716' },
  ]" style="max-height: 300px;">
      <u-table-view-column fixed title="序号" field="id" width="5%"></u-table-view-column>
      <u-table-view-column fixed title="姓名" field="name" width="10%"></u-table-view-column>
      <u-table-view-column title="省份" field="province" width="200"></u-table-view-column>
      <u-table-view-column title="城市" field="city" width="200"></u-table-view-column>
      <u-table-view-column fixed title="出生日期" field="birthday" width="20%"></u-table-view-column>
  </u-table-view>
  <u-table-view striped :data="[
      { id: 1, name: '张三', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦', birthday: '19910528' },
      { id: 2, name: '小明', province: '浙江省', city: '杭州市', district: '滨江区', address: '江虹路459号英飞特科技园', birthday: '19920914' },
      { id: 3, name: '李四', province: '浙江省', city: '杭州市', district: '滨江区', address: '秋溢路606号西可科技园', birthday: '19900228' },
      { id: 4, name: '李华', province: '浙江省', city: '杭州市', district: '滨江区', address: '长河路590号东忠科技园', birthday: '19891210' },
      { id: 5, name: '王五', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦二期', birthday: '19930716' },
      { id: 1, name: '张三', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦', birthday: '19910528' },
      { id: 2, name: '小明', province: '浙江省', city: '杭州市', district: '滨江区', address: '江虹路459号英飞特科技园', birthday: '19920914' },
      { id: 3, name: '李四', province: '浙江省', city: '杭州市', district: '滨江区', address: '秋溢路606号西可科技园', birthday: '19900228' },
      { id: 4, name: '李华', province: '浙江省', city: '杭州市', district: '滨江区', address: '长河路590号东忠科技园', birthday: '19891210' },
      { id: 5, name: '王五', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦二期', birthday: '19930716' },
  ]" style="max-height: 300px;" defaultColumnWidth="400px">
      <u-table-view-column fixed title="序号" field="id" width="200px"></u-table-view-column>
      <u-table-view-column fixed title="姓名" field="name" width="10%"></u-table-view-column>
      <u-table-view-column title="省份" field="province" width="200"></u-table-view-column>
      <u-table-view-column title="城市" field="city"></u-table-view-column>
      <u-table-view-column fixed title="出生日期" field="birthday"></u-table-view-column>
  </u-table-view>
  <u-table-view striped :data="[
      { id: 1, name: '张三', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦', birthday: '19910528' },
      { id: 2, name: '小明', province: '浙江省', city: '杭州市', district: '滨江区', address: '江虹路459号英飞特科技园', birthday: '19920914' },
      { id: 3, name: '李四', province: '浙江省', city: '杭州市', district: '滨江区', address: '秋溢路606号西可科技园', birthday: '19900228' },
      { id: 4, name: '李华', province: '浙江省', city: '杭州市', district: '滨江区', address: '长河路590号东忠科技园', birthday: '19891210' },
      { id: 5, name: '王五', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦二期', birthday: '19930716' },
      { id: 1, name: '张三', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦', birthday: '19910528' },
      { id: 2, name: '小明', province: '浙江省', city: '杭州市', district: '滨江区', address: '江虹路459号英飞特科技园', birthday: '19920914' },
      { id: 3, name: '李四', province: '浙江省', city: '杭州市', district: '滨江区', address: '秋溢路606号西可科技园', birthday: '19900228' },
      { id: 4, name: '李华', province: '浙江省', city: '杭州市', district: '滨江区', address: '长河路590号东忠科技园', birthday: '19891210' },
      { id: 5, name: '王五', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦二期', birthday: '19930716' },
  ]" style="max-height: 300px;" defaultColumnWidth="400">
      <u-table-view-column fixed title="序号" field="id" width="200px"></u-table-view-column>
      <u-table-view-column fixed title="姓名" field="name" width="10%"></u-table-view-column>
      <u-table-view-column title="省份" field="province" width="200"></u-table-view-column>
      <u-table-view-column title="城市" field="city"></u-table-view-column>
      <u-table-view-column fixed title="出生日期" field="birthday"></u-table-view-column>
  </u-table-view>
  <u-table-view striped :data="[
      { id: 1, name: '张三', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦', birthday: '19910528' },
      { id: 2, name: '小明', province: '浙江省', city: '杭州市', district: '滨江区', address: '江虹路459号英飞特科技园', birthday: '19920914' },
      { id: 3, name: '李四', province: '浙江省', city: '杭州市', district: '滨江区', address: '秋溢路606号西可科技园', birthday: '19900228' },
      { id: 4, name: '李华', province: '浙江省', city: '杭州市', district: '滨江区', address: '长河路590号东忠科技园', birthday: '19891210' },
      { id: 5, name: '王五', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦二期', birthday: '19930716' },
      { id: 1, name: '张三', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦', birthday: '19910528' },
      { id: 2, name: '小明', province: '浙江省', city: '杭州市', district: '滨江区', address: '江虹路459号英飞特科技园', birthday: '19920914' },
      { id: 3, name: '李四', province: '浙江省', city: '杭州市', district: '滨江区', address: '秋溢路606号西可科技园', birthday: '19900228' },
      { id: 4, name: '李华', province: '浙江省', city: '杭州市', district: '滨江区', address: '长河路590号东忠科技园', birthday: '19891210' },
      { id: 5, name: '王五', province: '浙江省', city: '杭州市', district: '滨江区', address: '网商路599号网易大厦二期', birthday: '19930716' },
  ]" style="max-height: 300px;" defaultColumnWidth="40%">
      <u-table-view-column fixed title="序号" field="id" width="200px"></u-table-view-column>
      <u-table-view-column fixed title="姓名" field="name" width="10%"></u-table-view-column>
      <u-table-view-column title="省份" field="province" width="200"></u-table-view-column>
      <u-table-view-column title="城市" field="city"></u-table-view-column>
      <u-table-view-column fixed title="出生日期" field="birthday"></u-table-view-column>
  </u-table-view>
</u-linear-layout>
</template>