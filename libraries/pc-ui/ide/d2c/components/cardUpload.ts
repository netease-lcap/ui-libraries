import { ComponentConfig } from '../types';

const cardUpload: ComponentConfig = {
  type: 'CardUpload',
  generateCode: (componentNode) => {
    return {
      id: componentNode.id,
      tag: 'u-uploader',
      code: `
<u-uploader  :listType="'card'" :accept="'.png,.jpg,.jpeg,.gif,.bmp'" :url="'/upload'" :urlField="'filePath'" :limit="999"
    :maxSize="'50MB'" :converter="'json'">
    <template #file-list >
        <i-ico  :flag="'file-icon'" :name="'file-default'" :icotype="'only'" style="margin: 0px 8px 0px 0px;"></i-ico>
        <u-text  :flag="'file-name'" :text="'文件名称'" style="margin: 0px 8px 0px 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inherit;"></u-text>
        <u-text  :flag="'file-size'" :text="'文件大小'" style="margin: 0px 8px 0px 0px;"></u-text>
        <i-ico  :flag="'download-icon'" :name="'download'" :icotype="'only'" style="margin: 0px 8px 0px 0px;"></i-ico>
    </template>
</u-uploader>
            `,
      name: '单文件卡片上传',
      reason: '点击上传文件并预览',
    };
  },
};

export default cardUpload;
