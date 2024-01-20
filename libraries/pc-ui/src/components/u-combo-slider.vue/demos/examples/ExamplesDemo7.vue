<!-- 同步时机 -->

<template>
  <div><u-grid-layout>
    <u-grid-layout-column :span="6">
        <u-combo-slider :value="20" :precision="10" :step="20"></u-combo-slider>
    </u-grid-layout-column>
    <u-grid-layout-column :span="6">
        <u-combo-slider :value="20" :precision="10" :step="20" sync-on="blur"></u-combo-slider>
    </u-grid-layout-column>
</u-grid-layout></div>
</template>