import { ComponentConfig } from '../types';

const uploadButton: ComponentConfig = {
  type: 'UploadButton',
  generateCode: (componentNode, textNodes) => {
    const { text } = textNodes[0].attrs;

    return {
      id: componentNode.id,
      tag: 'u-uploader',
      code: `
<u-uploader
    style="min-width: 176px;"
    :display="'inline'" :url="'/upload'" :urlField="'filePath'" :limit="999" :fileIconSwitcher="true" :downloadIconSwitcher="true"
    :fileSize="true" :maxSize="'50MB'" :converter="'json'">
    <template #file-list >
        <i-ico  :flag="'file-icon'" :name="'file-default'" :icotype="'only'" style="margin: 0px 8px 0px 0px;"></i-ico>
        <u-text  :flag="'file-name'" :text="'文件名称'" style="margin: 0px 8px 0px 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inherit;"></u-text>
        <u-text  :flag="'file-size'" :text="'文件大小'" style="margin: 0px 8px 0px 0px;"></u-text>
        <i-ico  :flag="'download-icon'" :name="'download'" :icotype="'only'" style="margin: 0px 8px 0px 0px;"></i-ico>
    </template>
    <u-button  :color="'primary'" :icon="'upload'" :text="'${text}'"></u-button>
</u-uploader>
            `,
      name: '文件上传',
      reason: '上传文件',
    };
  },
};

export default uploadButton;
