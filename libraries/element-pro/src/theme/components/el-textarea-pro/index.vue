<template>
  <div class="textarea-wrap">
    <el-textarea-pro disabled placeholder="禁用状态" />
    <el-textarea-pro placeholder="普通状态" tips="这是普通文本提示" :maxlength="5" />
    <el-textarea-pro status="success" placeholder="成功状态" tips="校验通过文本提示" :maxlength="10" />
    <el-textarea-pro status="warning" placeholder="警告状态" tips="校验不通过文本提示/校验不通过文本提示/校验不通过文本提示" :maxlength="10" />
    <el-textarea-pro status="error" placeholder="错误状态" tips="校验存在严重问题文本提示/校验存在严重问题文本提示/校验存在严重问题文本提示" :maxlength="10" />
  </div>
</template>
<style scoped>
.textarea-wrap {
  display: flex;
  flex-direction: column;
  gap: 15px
}
</style>