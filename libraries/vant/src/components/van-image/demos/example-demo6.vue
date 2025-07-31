<template>
  <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
    <template v-slot:loading>
      <van-loading type="spinner" size="20" />
    </template>
  </van-image>
</template>