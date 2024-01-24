<!-- 基本用法 -->

<template>
  <van-list-view pageable="load-more" vusion-disabled-addslot :pageSize="20">
    <template #prev>
        上一页
    </template>
    <template #next>
        下一页
    </template>
</van-list-view>
</template>