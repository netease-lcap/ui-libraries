<!-- 只读、禁用、禁用某一项 -->

<template>
  <div><u-linear-layout>
<u-pills value="C" readonly>
    <u-pill value="A">Apple</u-pill>
    <u-pill value="B">Banana</u-pill>
    <u-pill value="C">Cake</u-pill>
</u-pills>
<u-pills value="C" disabled>
    <u-pill value="A">Apple</u-pill>
    <u-pill value="B">Banana</u-pill>
    <u-pill value="C">Cake</u-pill>
</u-pills>
<u-pills value="C">
    <u-pill value="A">Apple</u-pill>
    <u-pill value="B" disabled>Banana</u-pill>
    <u-pill value="C">Cake</u-pill>
</u-pills>
</u-linear-layout></div>
</template>