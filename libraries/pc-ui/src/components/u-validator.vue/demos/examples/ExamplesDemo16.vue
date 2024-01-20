<!-- 失去焦点，还原正确的值 -->

<template>
  <div><u-form-item label="用户名" rules="^azAZ | ^azAZ09-$ | azAZ09$ | minLength(4)" blur-reset>
    <u-input maxlength="12" placeholder="4-12个字符" value="oldValue"></u-input>
</u-form-item></div>
</template>