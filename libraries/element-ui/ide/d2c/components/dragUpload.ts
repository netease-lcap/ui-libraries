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
<el-upload-pro style="${styleStr}" theme="file" :draggable="true" converter="simple" urlField="filePath" url="/upload" sizeLimitStr="50MB">
    <template #trigger >
        <el-button  icon="upload" type="primary" text="点击上传"></el-button>
    </template>
</el-upload-pro>
            `,
    };
  },
  name: '拖拽上传',
  reason: '点击或拖拽上传文件',
  tag: 'el-upload-pro',
};
