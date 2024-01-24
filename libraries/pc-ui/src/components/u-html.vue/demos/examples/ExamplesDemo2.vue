<!-- 不使用安全过滤 -->
<template>
<u-html html="<a href='https://www.163yun.com' target='_blank' >html 元素</a><img src='' onerror='console.log(1)'>" :security="false"></u-html>
</template>