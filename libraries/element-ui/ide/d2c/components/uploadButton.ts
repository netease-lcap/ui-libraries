import {
  ComponentCodeGen,
  styleObjToStr,
} from '../common';

const type = 'UploadButton';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes) => {
    const text = textNodes[0]?.attrs.text || '';
    const { width } = componentNode.style;
    const styleStr = styleObjToStr({ width });
    return {
      id: componentNode.id,
      code: `
<el-uploader
    style="${styleStr}"
    :display="'inline'" :url="'/upload'" :urlField="'filePath'" :limit="999" :fileIconSwitcher="true" :downloadIconSwitcher="true"
    :fileSize="true" :maxSize="'50MB'" :converter="'json'">
    <template #file-list >
        <i-ico  :flag="'file-icon'" :name="'file-default'" :icotype="'only'" style="margin: 0px 8px 0px 0px;"></i-ico>
        <el-text  :flag="'file-name'" :text="'文件名称'" style="margin: 0px 8px 0px 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inherit;"></el-text>
        <el-text  :flag="'file-size'" :text="'文件大小'" style="margin: 0px 8px 0px 0px;"></el-text>
        <i-ico  :flag="'download-icon'" :name="'download'" :icotype="'only'" style="margin: 0px 8px 0px 0px;"></i-ico>
    </template>
    <el-button  :color="'primary'" :icon="'upload'" :text="'${text}'"></el-button>
</el-uploader>
            `,
    };
  },
  name: '文件上传',
  reason: '上传文件',
  tag: 'el-uploader',
};
