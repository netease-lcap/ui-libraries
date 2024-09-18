<template>
  <el-dialog title="提示" :visible="true" width="30%" :modal="false" :show-close="false"
    :appendToBody="false" :closeOnPressEscape="false" :closeOnClickModal="false" class="dialog-preview-wrapper">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>
<style>
.dialog-preview-wrapper {
  position: unset !important;
}

.dialog-preview-wrapper .el-dialog {
  margin: 10px !important;
}
</style>