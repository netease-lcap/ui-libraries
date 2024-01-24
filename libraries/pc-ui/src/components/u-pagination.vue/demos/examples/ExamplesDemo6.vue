<!-- 只读和禁用 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-pagination :total="11" readonly></u-pagination>
    <u-pagination :total-items="75" show-total show-sizer show-jumper readonly></u-pagination>
    <u-pagination :total="11" disabled></u-pagination>
    <u-pagination :total-items="75" show-total show-sizer show-jumper disabled></u-pagination>
</u-linear-layout></div>
</template>