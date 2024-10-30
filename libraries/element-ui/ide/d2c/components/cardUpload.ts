import {
  ComponentCodeGen,
} from '../common';

const type = 'CardUpload';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode) => {
    return {
      id: componentNode.id,
      code: `
<el-uploader style="" :listType="'card'" :accept="'.png,.jpg,.jpeg,.gif,.bmp'" :url="'/upload'" :urlField="'filePath'" :limit="999"
    :maxSize="'50MB'" :converter="'json'">
    <template #file-list >
        <i-ico  :flag="'file-icon'" :name="'file-default'" :icotype="'only'" style="margin: 0px 8px 0px 0px;"></i-ico>
        <el-text  :flag="'file-name'" :text="'文件名称'" style="margin: 0px 8px 0px 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inherit;"></el-text>
        <el-text  :flag="'file-size'" :text="'文件大小'" style="margin: 0px 8px 0px 0px;"></el-text>
        <i-ico  :flag="'download-icon'" :name="'download'" :icotype="'only'" style="margin: 0px 8px 0px 0px;"></i-ico>
    </template>
</el-uploader>
            `,
    };
  },
  name: '单文件卡片上传',
  reason: '点击上传文件并预览',
  tag: 'el-uploader',
};
