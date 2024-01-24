<!-- 可关闭 -->

<template>
  <div><p><u-button @click="$refs.closableToast.show()">Static</u-button></p>
<u-toast ref="closableToast" position="static" text="Closable" :duration="0" closable></u-toast></div>
</template>