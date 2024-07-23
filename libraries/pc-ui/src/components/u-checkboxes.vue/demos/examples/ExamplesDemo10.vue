<!-- 排列方向 -->

<template>
  <div style="width: 300px;">
    <h2>横向排列，且每行3列</h2>
    <u-checkboxes :direction="'horizontal'" :column="3">
      <u-checkbox label="水杯">水杯</u-checkbox>
      <u-checkbox label="坚果" autofocus>坚果</u-checkbox>
      <u-checkbox label="毛巾">毛巾</u-checkbox>
      <u-checkbox label="沙发">沙发🛋️</u-checkbox>
      <u-checkbox label="葡萄">葡萄🍇</u-checkbox>
      <u-checkbox label="西瓜">西瓜🍉</u-checkbox>
      <u-checkbox label="芒果">芒果🥭</u-checkbox>
    </u-checkboxes>

    <h2>纵向排列</h2>
    <u-checkboxes :direction="'vertical'">
      <u-checkbox label="水杯">水杯</u-checkbox>
      <u-checkbox label="坚果" autofocus>坚果</u-checkbox>
      <u-checkbox label="毛巾">毛巾</u-checkbox>
      <u-checkbox label="沙发">沙发🛋️</u-checkbox>
      <u-checkbox label="葡萄">葡萄🍇</u-checkbox>
      <u-checkbox label="西瓜">西瓜🍉</u-checkbox>
      <u-checkbox label="芒果">芒果🥭</u-checkbox>
    </u-checkboxes>
  </div>

</template>