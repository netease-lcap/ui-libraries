<!-- 自定义样式 -->
<template>
<u-linear-layout>
    <u-input :class="$style.custom" maxlength="12" placeholder="class"></u-input>
    <u-input style="background: #f7f8fc; width: 200px;" maxlength="12" placeholder="style"></u-input>
</u-linear-layout>
</template>

<style module>
.custom {
    background: #f7f8fc;
    width: 60px;
}
</style>