import {
  ComponentCodeGen,
  styleObjToStr,
} from '../common';

const type = 'DragUpload';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode) => {
    const { width } = componentNode.style;
    const styleStr = styleObjToStr({ width });

    return {
      id: componentNode.id,
      code: `
<el-uploader style="${styleStr}" :display="'inline'" :url="'/upload'" :urlField="'filePath'" :limit="999" :file-icon-switcher="true" :download-icon-switcher="true"
    :file-size="true" :maxSize="'50MB'" :converter="'json'" :draggable="true">
    <template #file-list >
        <i-ico  :flag="'file-icon'" :name="'file-default'" :icotype="'only'" style="margin: 0px 8px 0px 0px;"></i-ico>
        <el-text  :flag="'file-name'" :text="'文件名称'" style="margin: 0px 8px 0px 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inherit;"></el-text>
        <el-text  :flag="'file-size'" :text="'文件大小'" style="margin: 0px 8px 0px 0px;"></el-text>
        <i-ico  :flag="'download-icon'" :name="'download'" :icotype="'only'" style="margin: 0px 8px 0px 0px;"></i-ico>
    </template>
    <el-button  :color="'primary'" :icon="'upload'" :text="'上传'"></el-button>
</el-uploader>

            `,
    };
  },
  name: '拖拽上传',
  reason: '点击或拖拽上传文件',
  tag: 'el-uploader',
};
