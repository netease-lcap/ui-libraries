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
<el-upload-pro 
  style=""
  theme="image" accept=".png,.jpg,.jpeg,.gif,.bmp" converter="simple" urlField="filePath"
  url="/upload" sizeLimitStr="50MB"
>
    <template #trigger >
        <el-button icon="upload" type="primary" text="点击上传"></el-button>
    </template>
</el-upload-pro>
            `,
    };
  },
  name: '单文件卡片上传',
  reason: '点击上传文件并预览',
  tag: 'el-upload-pro',
};
