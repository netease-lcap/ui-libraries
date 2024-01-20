<!-- 范围 -->

<template>
  <div><u-grid-layout>
    <u-grid-layout-column :span="6">
        <u-slider :value="50" :range="[20, 85]"></u-slider>
    </u-grid-layout-column>
    <u-grid-layout-column :span="6">
        <u-slider :value="40" :step="10" :range="[30]"></u-slider>
    </u-grid-layout-column>
</u-grid-layout></div>
</template>