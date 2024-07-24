import { ComponentConfig } from '../types';

const dragUpload: ComponentConfig = {
  type: 'DragUpload',
  generateCode: (componentNode) => {
    const { width } = componentNode.bound;

    return {
      id: componentNode.id,
      tag: 'u-uploader',
      code: `
<u-uploader style="width: ${width}px" :display="'inline'" :url="'/upload'" :urlField="'filePath'" :limit="999" :file-icon-switcher="true" :download-icon-switcher="true"
    :file-size="true" :maxSize="'50MB'" :converter="'json'" :draggable="true">
    <template #file-list >
        <i-ico  :flag="'file-icon'" :name="'file-default'" :icotype="'only'" style="margin: 0px 8px 0px 0px;"></i-ico>
        <u-text  :flag="'file-name'" :text="'文件名称'" style="margin: 0px 8px 0px 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inherit;"></u-text>
        <u-text  :flag="'file-size'" :text="'文件大小'" style="margin: 0px 8px 0px 0px;"></u-text>
        <i-ico  :flag="'download-icon'" :name="'download'" :icotype="'only'" style="margin: 0px 8px 0px 0px;"></i-ico>
    </template>
    <u-button  :color="'primary'" :icon="'upload'" :text="'上传'"></u-button>
</u-uploader>

            `,
      name: '拖拽上传',
      reason: '点击或拖拽上传文件',
    };
  },
};

export default dragUpload;
