<!-- 自定义样式 -->
<template>
<u-linear-layout>
    <u-auto-complete :class="$style.custom" maxlength="12" placeholder="class"></u-auto-complete>
    <u-auto-complete style="background: #f7f8fc; width: 200px;" maxlength="12" placeholder="style"></u-auto-complete>
</u-linear-layout>
</template>

<style module>
.custom {
    background: #f7f8fc;
    width: 60px;
}
</style>