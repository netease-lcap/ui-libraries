<!-- 只读和禁用 -->

<template>
  <div><u-grid-layout>
    <u-grid-layout-column :span="8">
        <u-combo-slider :value="36" readonly></u-combo-slider>
    </u-grid-layout-column>
    <u-grid-layout-column :span="8">
        <u-combo-slider :value="36" disabled></u-combo-slider>
    </u-grid-layout-column>
</u-grid-layout></div>
</template>