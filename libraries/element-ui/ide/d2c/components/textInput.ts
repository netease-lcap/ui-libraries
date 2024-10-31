import {
  ComponentCodeGen,
  styleObjToStr,
} from '../common';

const type = 'TextInput';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes) => {
    const textNode = textNodes[0];
    const text = textNode?.attrs.text || '';
    const { width } = componentNode.style;
    const styleStr = styleObjToStr({ width });
    return {
      id: componentNode.id,
      code: `
<el-input-pro
    style="${styleStr}" 
    placeholder='${text}'
/>`,
    };
  },
  name: '单行输入',
  reason: '进行输入和校验',
  tag: 'el-input-pro',
};
