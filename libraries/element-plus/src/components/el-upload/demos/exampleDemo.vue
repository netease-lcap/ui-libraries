<template>
  <div>
    <el-upload
      class="upload-demo"
      action="/upload"
      v-model="fileList"
      :fileSizeLimit="1"
      url-field="filePath"
      multiple
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :hasTip="true"
      :before-remove="beforeRemove">
      <el-button type="primary">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
      </template>
      <!-- <template #file="{ file }">
        <div style="display: flex; align-items: center">
          <el-icon style="margin: 0 8px; font-size: 16px" name="document"></el-icon>
          <el-text @click="handleClick(file)" :text="file.name"></el-text>
          <el-icon name="CircleCheck" style="color: #67c23a; font-size: 14px; margin-left: auto;margin-right: 4px;"></el-icon>
          <el-icon name="Close" style=" font-size: 14px; margin-left: auto;margin-right: 4px;"></el-icon>
        </div>
      </template> -->
      <template #append>
        <span>2342134</span>
      </template>
    </el-upload>
    {{ fileList }}
    <!-- <el-text :text="fileList"></el-text> -->
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

import type { UploadProps, UploadUserFile } from 'element-plus';

const fileList = ref<String>(
  `https://element-plus.org/images/element-plus-logo.svg
  ,https://element-plus.org/images/element-plus-logo.svg`,
);

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile,'upload');
};

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ?`).then(
    () => true,
    () => false,
  );
};

const handleClick = (file: UploadUserFile) => {
  console.log(file);
};
</script>
