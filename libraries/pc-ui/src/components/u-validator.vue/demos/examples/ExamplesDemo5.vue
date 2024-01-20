<!-- 完整格式 -->

<template>
  <div><u-form-item label="用户名" required :rules="[
    { validate: 'required', required: true, trigger: 'blur', message: '请输入用户名' },
    { validate: 'pattern', args: /^[a-zA-Z]/, trigger: 'input+blur', message: '以字母开头' },
    { validate: 'pattern', args: /^[a-zA-Z0-9-]$/, trigger: 'input+blur', message: '字母、数字或中划线组成' },
    { validate: 'pattern', args: /[a-zA-Z0-9]$/, trigger: 'blur', message: '以字母或数字结尾' },
    { validate: 'minLength', args: [4], trigger: 'blur', message: '不得少于4个字符' },
]">
    <u-input maxlength="12" placeholder="4-12个字符"></u-input>
</u-form-item></div>
</template>