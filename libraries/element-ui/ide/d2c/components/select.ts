import {
  ComponentCodeGen,
  styleObjToStr,
} from '../common';

const type = 'Select';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes) => {
    const textNode = textNodes[0];
    const text = textNode?.attrs.text || '';
    const { width, height } = componentNode.style;
    const styleStr = styleObjToStr({
      width,
      height,
    });
    return {
      id: componentNode.id,
      code: `<el-select-pro placeholder="${text}" style="${styleStr}" />`,
    };
  },
  name: '选择器',
  reason: '进行下拉选择',
  tag: 'el-select-pro',
};
