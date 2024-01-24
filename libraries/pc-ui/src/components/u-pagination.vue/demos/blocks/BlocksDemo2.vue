<!-- 全部配置 -->

<template>
  <u-linear-layout direction="vertical">
    <u-pagination
        :totalItems="75"
        showTotal
        showSizer
        showJumper
        :pageSize="10"
        :pageSizeOptions="[40,50,100]">
    </u-pagination>
</u-linear-layout>
</template>