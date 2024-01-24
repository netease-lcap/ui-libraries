<!-- 只读、禁用、禁用某一项 -->

<template>
  <div><u-grid-layout>
    <u-grid-layout-column :span="4">
        <m-singlex value="towel" readonly>
            <m-singlex-item value="cup" text="水杯"></m-singlex-item>
            <m-singlex-item value="coffee" text="咖啡"></m-singlex-item>
            <m-singlex-item value="nut" text="坚果"></m-singlex-item>
            <m-singlex-item value="towel" text="毛巾"></m-singlex-item>
            <m-singlex-item value="sofa" text="沙发"></m-singlex-item>
        </m-singlex>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <m-singlex value="towel" disabled>
            <m-singlex-item value="cup" text="水杯"></m-singlex-item>
            <m-singlex-item value="coffee" text="咖啡"></m-singlex-item>
            <m-singlex-item value="nut" text="坚果"></m-singlex-item>
            <m-singlex-item value="towel" text="毛巾"></m-singlex-item>
            <m-singlex-item value="sofa" text="沙发"></m-singlex-item>
        </m-singlex>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <m-singlex value="towel">
            <m-singlex-item value="cup" text="水杯"></m-singlex-item>
            <m-singlex-item value="coffee" text="咖啡"></m-singlex-item>
            <m-singlex-item value="nut" disabled text="坚果"></m-singlex-item>
            <m-singlex-item value="towel" disabled text="毛巾"></m-singlex-item>
            <m-singlex-item value="sofa" text="沙发"></m-singlex-item>
        </m-singlex>
    </u-grid-layout-column>
</u-grid-layout></div>
</template>