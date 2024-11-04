import {
  ComponentCodeGen,
  styleObjToStr,
} from '../common';

const type = 'TextArea';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes) => {
    const textNode = textNodes[0];
    const text = textNode?.attrs.text;
    const { width, height } = componentNode.style;
    const styleStr = styleObjToStr({ width, height });
    return {
      id: componentNode.id,
      code: `<el-textarea-pro placeholder="${text}" style="${styleStr}" />`,
    };
  },
  name: '多行输入框',
  reason: '进行多行输入',
  tag: 'el-textarea-pro',
};
