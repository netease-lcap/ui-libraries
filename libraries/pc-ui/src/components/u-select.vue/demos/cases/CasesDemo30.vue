<!-- 反色 -->

<template>
  <div><u-linear-layout>
    <u-select value="nut" readonly color="inverse">
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee">咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
    </u-select>
    <u-select value="nut" disabled color="inverse">
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee">咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
    </u-select>
    <u-select value="nut" color="inverse">
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee" disabled>咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
    </u-select>
</u-linear-layout></div>
</template>