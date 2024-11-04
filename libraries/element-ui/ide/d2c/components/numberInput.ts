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
      code: `<el-input-number-pro style="${styleStr}" theme="column" />`,
    };
  },
  name: '数字输入',
  reason: '进行数字输入和校验',
  tag: 'el-input-number-pro',
};
