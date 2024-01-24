<!-- 上一页和下一页 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-pagination :total="11">
        <a slot="prev" role="text">上一页</a>
        <a slot="next" role="text">下一页</a>
    </u-pagination>
</u-linear-layout></div>
</template>