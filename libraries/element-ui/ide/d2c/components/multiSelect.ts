import {
  ComponentCodeGen,
  styleObjToStr,
} from '../common';

const type = 'MultiSelect';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes) => {
    const textNode = textNodes[0];
    const text = textNode?.attrs.text || '';
    const { width } = componentNode.style;
    const styleStr = styleObjToStr({ width });
    return {
      id: componentNode.id,
      code: `<el-select-pro :multiple="true" placeholder="${text}" style="${styleStr}" />`,
    };
  },
  name: '下拉多选',
  reason: '进行下拉多选',
  tag: 'el-select-pro',
};
