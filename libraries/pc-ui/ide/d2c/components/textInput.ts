import { ComponentConfig } from '../types';

const textInput: ComponentConfig = {
  type: 'TextInput',
  generateCode: (componentNode, textNodes) => {
    const textNode = textNodes[0];
    const { text } = textNode.attrs;
    const { width } = componentNode.bound;
    return {
      id: componentNode.id,
      tag: 'u-input',
      code: `
<u-input
    style="width:${width}px" 
    placeholder='${text}'
/>`,
      name: '单行输入',
      reason: '进行输入和校验',
    };
  },
};

export default textInput;
