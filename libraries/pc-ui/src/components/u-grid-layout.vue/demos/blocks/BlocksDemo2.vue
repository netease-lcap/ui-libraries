<!-- 4列样式（2:4:8:10） -->

<template>
  <u-grid-layout>
    <u-grid-layout-row :repeat="24">
        <u-grid-layout-column :span="2" :wrap="true"></u-grid-layout-column>
        <u-grid-layout-column :span="4" :wrap="true"></u-grid-layout-column>
        <u-grid-layout-column :span="8" :wrap="true"></u-grid-layout-column>
        <u-grid-layout-column :span="10" :wrap="true"></u-grid-layout-column>
    </u-grid-layout-row>
</u-grid-layout>
</template>
