import { ComponentConfig } from '../types';

// 和 textInput 的区别：1. 两个文本 2. 没有边框
const textInputInMobile: ComponentConfig = {
  type: 'TextInputInMobile',
  generateCode: (componentNode, textNodes) => {
    const textNode = textNodes.filter((n) => n.attrs.text?.trim() !== '*')[1];
    const { text } = textNode.attrs;
    const width = componentNode.absoluteBound.x
      + componentNode.bound.width
      - textNode.absoluteBound.x
      - 16;
    return {
      // 在 h5 中，把文本节点作为输入框
      id: textNode.id,
      tag: 'van-fieldinput',
      code: `<van-fieldinput placeholder='${text}' type='text' style="width:${width}px" />`,
      name: '单行输入',
      reason: '进行输入和校验',
    };
  },
};

export default textInputInMobile;
