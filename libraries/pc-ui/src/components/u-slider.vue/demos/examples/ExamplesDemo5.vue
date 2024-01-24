<!-- 只读和禁用 -->

<template>
  <div><u-grid-layout>
    <u-grid-layout-column :span="6">
        <u-slider :value="36" readonly></u-slider>
    </u-grid-layout-column>
    <u-grid-layout-column :span="6">
        <u-slider :value="36" disabled></u-slider>
    </u-grid-layout-column>
</u-grid-layout></div>
</template>