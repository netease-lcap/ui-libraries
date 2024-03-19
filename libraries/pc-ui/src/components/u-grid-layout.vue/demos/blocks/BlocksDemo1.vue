<!-- 3列样式（8:8:8） -->

<template>
  <u-grid-layout>
    <u-grid-layout-row :repeat="24">
        <u-grid-layout-column :span="8" :wrap="true"></u-grid-layout-column>
        <u-grid-layout-column :span="8" :wrap="true"></u-grid-layout-column>
        <u-grid-layout-column :span="8" :wrap="true"></u-grid-layout-column>
    </u-grid-layout-row>
</u-grid-layout>
</template>
