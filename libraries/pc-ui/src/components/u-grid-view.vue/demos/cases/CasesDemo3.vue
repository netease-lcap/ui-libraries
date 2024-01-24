<!-- 只读、禁用、禁用某一项 -->

<template>
  <div><u-grid-layout>
    <u-grid-layout-column :span="4">
        <u-grid-view value="towel" readonly>
            <u-grid-view-item value="cup">水杯</u-grid-view-item>
            <u-grid-view-item value="nut">坚果</u-grid-view-item>
            <u-grid-view-item value="towel">毛巾</u-grid-view-item>
            <u-grid-view-item value="sofa">沙发</u-grid-view-item>
        </u-grid-view>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <u-grid-view value="towel" disabled>
            <u-grid-view-item value="cup">水杯</u-grid-view-item>
            <u-grid-view-item value="nut">坚果</u-grid-view-item>
            <u-grid-view-item value="towel">毛巾</u-grid-view-item>
            <u-grid-view-item value="sofa">沙发</u-grid-view-item>
        </u-grid-view>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <u-grid-view value="towel">
            <u-grid-view-item value="cup">水杯</u-grid-view-item>
            <u-grid-view-item value="nut" disabled>坚果</u-grid-view-item>
            <u-grid-view-item value="towel">毛巾</u-grid-view-item>
            <u-grid-view-item value="sofa">沙发</u-grid-view-item>
        </u-grid-view>
    </u-grid-layout-column>
</u-grid-layout></div>
</template>