<template>
  <div>
    <el-upload ref="uploadRef" class="upload-demo" action="/upload" v-model="fileList" :fileSizeLimit="1"
      url-field="filePath" multiple :on-preview="handlePreview" :on-remove="handleRemove" :hasTip="true"
      list-type="picture-card" :before-remove="beforeRemove">
      <el-button type="primary">Click to upload</el-button>

    </el-upload>
    {{ fileList }}
    <!-- <el-text :text="fileList"></el-text> -->
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

import type { UploadProps, UploadUserFile } from 'element-plus';
const uploadRef = ref<InstanceType<typeof ElUpload>>();


const fileList = ref<String>(

  `https://element-plus.org/images/element-plus-12341234logo1234logo1234logo1234logo1234logo1234logo1234logologo.svg
  ,https://element-plus.org/images/element-plus-logo.svg`,
);
  setTimeout(() => {
    console.log(uploadRef.value.handleRemove({

    }),'====');
  }, 3000);

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile, 'upload');
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
