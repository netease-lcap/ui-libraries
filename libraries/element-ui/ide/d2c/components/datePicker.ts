import {
  ComponentCodeGen,
  styleObjToStr,
} from '../common';

const type = 'DatePicker';
export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode) => {
    const { width } = componentNode.style;
    const styleStr = styleObjToStr({ width });
    return {
      id: componentNode.id,
      code: `<el-date-picker-pro style='${styleStr}' />`,
    };
  },
  name: '日期选择',
  reason: '进行日期选择',
  tag: 'el-date-picker-pro',
};
