<!-- 格式化 -->

<template>
  <div><u-grid-layout>
    <u-grid-layout-column :span="8">
        <u-combo-slider :value="6" formatter="000"></u-combo-slider>
    </u-grid-layout-column>
    <u-grid-layout-column :span="8">
        <u-combo-slider :value="20" formatter="0%"></u-combo-slider>
    </u-grid-layout-column>
</u-grid-layout></div>
</template>