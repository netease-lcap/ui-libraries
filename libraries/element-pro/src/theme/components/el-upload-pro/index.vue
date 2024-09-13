<template>
  <div>
    <el-radio-group-pro v-model="theme">
      <el-radio-pro value="file">基础文件上传</el-radio-pro>
      <el-radio-pro value="file-flow">文件批量上传</el-radio-pro>
      <el-radio-pro value="image">图片上传</el-radio-pro>
      <el-radio-pro value="image-flow">图片批量上传</el-radio-pro>
    </el-radio-group-pro>
    <div class="actions-warp">
      <el-checkbox-pro v-model="disabled">是否禁用</el-checkbox-pro>
      <el-checkbox-pro v-model="draggable">是否启用拖拽上传</el-checkbox-pro>
    </div>
    <div>
      <div class="desc_tip">初始-手动上传</div>
      <el-upload-pro :theme="theme" :multiple="true" :disabled="disabled" :draggable="draggable"
        :format-response="formatResponse" :placeholder="placeholderList[theme]" :autoUpload="false"
        :showThumbnail="true" action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        @fail="handleFail"></el-upload-pro>

      <div class="desc_tip">上传中-自动上传</div>
      <el-upload-pro :fileList="files" :theme="theme" :multiple="true" :showThumbnail="true" :disabled="disabled"
        :draggable="draggable" :format-response="formatResponse" :placeholder="placeholderList[theme]"
        action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        @fail="handleFail"></el-upload-pro>
    </div>
  </div>
</template>
<script>

const uploadingFile = [
  {
    name: '这是一个上传失败的文件',
    status: 'fail',
    url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
    size: 1000,
  },
  {
    name: '这是一个上传中的文件',
    status: 'progress',
    percent: 30,
    url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
    size: 1000,
  },
  {
    name: '这是一个上传成功的文件',
    status: 'success',
    url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
    size: 1000,
  },
  {
    name: '这是一个等待上传的文件',
    status: 'waiting',
    url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
    size: 1000,
  },
]

export default {
  data() {
    return {
      placeholderList: {
        'file': '基础文件上传',
        'file-flow': '文件批量上传',
        'image': '图片上传',
        'image-flow': '图片批量上传'
      },
      files: uploadingFile,
      disabled: false,
      draggable: false,
      theme: 'file',
    };
  },
  methods: {
    handleFail({ file }) {
      this.$message.error(`文件 ${file.name} 上传失败`);
    },
    formatResponse(res) {
      return { error: '上传失败，请重试', url: res.url };
    },
  },
};

</script>
<style scoped>
.actions-warp {
  display: flex;
  gap: 10px;
  margin: 10px 0 20px 0;
}

.desc_tip {
  font-size: 12px;
  margin: 40px 0 10px 0;
}
</style>