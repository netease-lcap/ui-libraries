<!-- 提示 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-combo-slider :step="10" unit="GB" tip="步长为10GB"></u-combo-slider>
    <u-combo-slider :step="10" unit="GB">
        <template #tip>
            <u-linear-layout gap="small">
                <i-ico name="help"></i-ico>
                <u-text>步长为10GB</u-text>
            </u-linear-layout>
        </template>
    </u-combo-slider>
</u-linear-layout></div>
</template>