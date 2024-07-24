import { ComponentConfig } from '../types';

const select: ComponentConfig = {
  type: 'Select',
  generateCode: (componentNode, textNodes) => {
    const textNode = textNodes[0];
    const { text } = textNode.attrs;
    const { width } = componentNode.bound;
    return {
      id: componentNode.id,
      tag: 'u-select',
      code: `<u-select placeholder="${text}" style="width:${width}px" />`,
      name: '选择器',
      reason: '进行下拉选择',
    };
  },
};

export default select;
