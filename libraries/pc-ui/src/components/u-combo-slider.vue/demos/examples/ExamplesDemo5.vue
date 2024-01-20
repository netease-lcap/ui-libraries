<!-- 精度与间隔 -->

<template>
  <div><u-grid-layout>
    <u-grid-layout-column :span="8">
        <u-combo-slider :value="20" :precision="5" :step="5"></u-combo-slider>
    </u-grid-layout-column>
    <u-grid-layout-column :span="8">
        <u-combo-slider :value="20" :precision="5" :step="20"></u-combo-slider>
    </u-grid-layout-column>
    <u-grid-layout-column :span="8">
        <u-combo-slider :value="20" :step="0"></u-combo-slider>
    </u-grid-layout-column>
</u-grid-layout></div>
</template>