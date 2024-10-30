import {
  ComponentCodeGen,
  styleObjToStr,
} from '../common';

const type = 'NumberInput';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode) => {
    const { width } = componentNode.style;
    const styleStr = styleObjToStr({ width });
    return {
      id: componentNode.id,
      code: `<el-number-input style="${styleStr}" />`,
    };
  },
  name: '数字输入',
  reason: '进行数字输入和校验',
  tag: 'el-number-input',
};
