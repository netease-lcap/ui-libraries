<!-- 显隐延时 -->

<template>
  <div><u-button>
    hover
    <m-popper trigger="hover" :hover-delay="200" :hide-delay="1000">
        <u-block>popper</u-block>
    </m-popper>
</u-button></div>
</template>