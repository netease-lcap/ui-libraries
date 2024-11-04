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
<el-upload-pro
    style="${styleStr}"
  converter="simple" urlField="filePath" url="/upload" sizeLimitStr="50MB">
    <template #trigger >
        <el-button  icon="upload" type="primary" text="${text}"></el-button>
    </template>
</el-upload-pro>
            `,
    };
  },
  name: '文件上传',
  reason: '上传文件',
  tag: 'el-upload-pro',
};
