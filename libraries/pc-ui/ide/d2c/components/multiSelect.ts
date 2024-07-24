import { ComponentConfig } from '../types';

const multiSelect: ComponentConfig = {
  type: 'MultiSelect',
  generateCode: (componentNode, textNodes) => {
    const textNode = textNodes[0];
    const { text } = textNode.attrs;
    const { width } = componentNode.bound;
    return {
      id: componentNode.id,
      tag: 'u-select',
      code: `<u-select placeholder="${text}" style="width:${width}px" />`,
      name: '下拉多选',
      reason: '进行下拉多选',
    };
  },
};

export default multiSelect;
