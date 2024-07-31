import { ComponentConfig } from '../types';

const uploadH5: ComponentConfig = {
  type: 'UploadInMobile',
  generateCode: (componentNode) => {
    const { width } = componentNode.bound;

    return {
      id: componentNode.id,
      tag: 'van-uploader',
      code: `<van-uploader style="width: ${width}px;" :converter="'json'" :url="'/upload'" :urlField="'filePath'"></van-uploader>`,
      name: '文件上传',
      reason: '点击上传文件',
    };
  },
};

export default uploadH5;
