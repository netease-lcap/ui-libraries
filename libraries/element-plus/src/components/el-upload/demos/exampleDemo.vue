<template>
  <div>
    <el-upload class="upload-demo" action="/upload"
    v-model="fileList"
      url-field="filePath" multiple :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
    >
      <el-button type="primary">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
    </el-upload>
    {{ fileList }}
    <!-- <el-text :text="fileList"></el-text> -->
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'


import type { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<String>('https://element-plus.org/images/element-plus-logo.svg,https://element-plus.org/images/element-plus-logo.svg')

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}
</script>
