<!-- 基本用法 -->

<template>
  <div><u-button @click="$refs.toast.show()">弹出消息</u-button>
<u-toast ref="toast">这是一条消息</u-toast></div>
</template>