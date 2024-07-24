import { ComponentConfig } from '../types';

const textInput: ComponentConfig = {
  type: 'TextInput',
  generateCode: (componentNode, textNodes) => {
    const textNode = textNodes[0];
    const { text } = textNode.attrs;
    const textWidth = textNode.bound.width;
    return {
      // 在 h5 中，把文本节点作为输入框
      id: textNode.id,
      tag: 'van-fieldinput',
      code: `<van-fieldinput placeholder='${text}' type='text' style="width:${textWidth}px" />`,
      name: '单行输入',
      reason: '进行输入和校验',
    };
  },
};

export default textInput;
