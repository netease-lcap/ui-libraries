<!-- 只读、禁用、禁用某一项 -->

<template>
  <div><u-grid-layout>
    <u-grid-layout-column :span="4">
        <m-multiplex :value="['nut', 'towel']" readonly>
            <m-multiplex-item value="cup" text="水杯"></m-multiplex-item>
            <m-multiplex-item value="coffee" text="咖啡"></m-multiplex-item>
            <m-multiplex-item value="nut" text="坚果"></m-multiplex-item>
            <m-multiplex-item value="towel" text="毛巾"></m-multiplex-item>
            <m-multiplex-item value="sofa" text="沙发"></m-multiplex-item>
        </m-multiplex>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <m-multiplex :value="['nut', 'towel']" disabled>
            <m-multiplex-item value="cup" text="水杯"></m-multiplex-item>
            <m-multiplex-item value="coffee" text="咖啡"></m-multiplex-item>
            <m-multiplex-item value="nut" text="坚果"></m-multiplex-item>
            <m-multiplex-item value="towel" text="毛巾"></m-multiplex-item>
            <m-multiplex-item value="sofa" text="沙发"></m-multiplex-item>
        </m-multiplex>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <m-multiplex :value="['nut', 'towel']">
            <m-multiplex-item value="cup" text="水杯"></m-multiplex-item>
            <m-multiplex-item value="coffee" text="咖啡"></m-multiplex-item>
            <m-multiplex-item value="nut" disabled text="坚果"></m-multiplex-item>
            <m-multiplex-item value="towel" disabled text="毛巾"></m-multiplex-item>
            <m-multiplex-item value="sofa" text="沙发"></m-multiplex-item>
        </m-multiplex>
    </u-grid-layout-column>
</u-grid-layout></div>
</template>