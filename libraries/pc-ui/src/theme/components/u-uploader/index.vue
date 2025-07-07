<template>
<div>
     <div style="margin-bottom:40px;">
        <div class="componentClassTitle">单文件按钮</div>
        <u-uploader
            url="http://localhost:7000/api/library/upload"
            v-model="files"
            multiple>
            <u-button color="primary">Upload</u-button>
            <template #file-list>
                <i-ico style="margin: 0px 8px 0px 0px;" flag="file-icon" name="file-default" icotype="only"></i-ico>
                <u-text style="margin: 0px 8px 0px 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inherit;" flag="file-name" text="文件名称"></u-text>
                <u-text style="margin: 0px 8px 0px 0px;" flag="file-size" text="文件大小"></u-text>
                <i-ico style="margin: 0px 8px 0px 0px;" flag="download-icon" name="download" icotype="only"></i-ico>
            </template>
        </u-uploader>
    </div>
    <div style="margin-bottom:40px;">
      <u-uploader
        url="http://localhost:7000/api/library/upload"
        draggable
      ></u-uploader>
    </div>
    <div style="margin-bottom:40px;">
        <div class="componentClassTitle">单文件卡片</div>
        <u-uploader accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
            url="http://localhost:7000/api/library/upload"
            list-type="card"
            :limit="999"
            v-model="files"
            multiple
          >
        </u-uploader>
    </div>
    <div style="margin-bottom:40px;">
        <div class="componentClassTitle">多图片按钮</div>
        <u-uploader accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
            url="http://localhost:7000/api/library/upload"
            list-type="image"
            v-model="files"
            multiple>
            <u-button color="primary">Upload</u-button>
        </u-uploader>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            files: [{
                uid: '1',
                name: 'breakfast.png',
                status: 'success',
                url: 'https://static-vusion.nos.lcap.163yun.com/assets/breakfast.png',
            }, {
                uid: '2',
                name: 'salad.png',
                status: 'success',
                url: 'https://static-vusion.nos.lcap.163yun.com/assets/salad.png',
            }],
        };
    },
};
</script>