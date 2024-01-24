<!-- 嵌入文档流 -->

<template>
  <div><p><u-button @click="$refs.staticToast.show()">Static</u-button></p>
<u-toast ref="staticToast" position="static" text="Static Toast"></u-toast></div>
</template>