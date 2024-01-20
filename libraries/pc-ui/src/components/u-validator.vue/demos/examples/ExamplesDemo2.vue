<!-- 字符串简写说明： -->

<template>
  <div><u-form-item label="用户名" required rules="required | ^azAZ | ^azAZ09-$ @b | azAZ09$ | minLength(4) #4-12个字符">
    <u-input maxlength="12" placeholder="4-12个字符"></u-input>
</u-form-item></div>
</template>