import {
  ComponentCodeGen,
  styleObjToStr,
} from '../common';

const type = 'TimePicker';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode) => {
    const { width } = componentNode.style;
    const styleStr = styleObjToStr({ width });
    return {
      id: componentNode.id,
      code: `
      <el-time-picker-pro 
        style='${styleStr}' 
      />`,
    };
  },
  name: '时间选择',
  reason: '进行时间选择',
  tag: 'el-time-picker-pro',
};
