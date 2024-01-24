<!-- 自定义样式 -->
<template>
<u-linear-layout>
    <u-textarea :class="$style.custom" placeholder="class"></u-textarea>
    <u-textarea style="background: #f7f8fc; width: 200px;" placeholder="style"></u-textarea>
</u-linear-layout>
</template>

<style module>
.custom {
    background: #f7f8fc;
    width: 60px;
}
</style>