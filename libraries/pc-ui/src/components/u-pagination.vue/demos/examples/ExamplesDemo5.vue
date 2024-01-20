<!-- 全部配置 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-pagination :total-items="75" show-total show-sizer show-jumper></u-pagination>
    <u-pagination
        :total-items="75"
        show-total
        show-sizer
        show-jumper
        :pageSize="30"
        :pageSizeOptions="[30,50,100]">
    </u-pagination>
</u-linear-layout></div>
</template>