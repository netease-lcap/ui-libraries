<!-- 只读、禁用、禁用某一项 -->

<template>
  <div><u-grid-layout>
    <u-grid-layout-column :span="4">
        <m-complex value="towel" readonly>
            <m-complex-item value="cup">水杯</m-complex-item>
            <m-complex-item value="coffee">咖啡</m-complex-item>
            <m-complex-item value="nut">坚果</m-complex-item>
            <m-complex-item value="towel">毛巾</m-complex-item>
            <m-complex-item value="sofa">沙发</m-complex-item>
        </m-complex>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <m-complex value="towel" disabled>
            <m-complex-item value="cup">水杯</m-complex-item>
            <m-complex-item value="coffee">咖啡</m-complex-item>
            <m-complex-item value="nut">坚果</m-complex-item>
            <m-complex-item value="towel">毛巾</m-complex-item>
            <m-complex-item value="sofa">沙发</m-complex-item>
        </m-complex>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <m-complex value="towel">
            <m-complex-item value="cup">水杯</m-complex-item>
            <m-complex-item value="coffee">咖啡</m-complex-item>
            <m-complex-item value="nut" disabled>坚果</m-complex-item>
            <m-complex-item value="towel" disabled>毛巾</m-complex-item>
            <m-complex-item value="sofa">沙发</m-complex-item>
        </m-complex>
    </u-grid-layout-column>
</u-grid-layout></div>
</template>