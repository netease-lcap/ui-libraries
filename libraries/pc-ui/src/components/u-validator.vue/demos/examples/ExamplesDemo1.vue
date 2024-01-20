<!-- 简写格式 -->

<template>
  <div><u-form-item label="用户名" rules="required | ^azAZ | ^azAZ09-$ | azAZ09$ | minLength(4)">
    <u-input maxlength="12" placeholder="4-12个字符"></u-input>
</u-form-item></div>
</template>