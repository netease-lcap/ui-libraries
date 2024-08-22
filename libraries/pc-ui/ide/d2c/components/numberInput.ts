import { ComponentConfig } from '../types';

const numberInput: ComponentConfig = {
  type: 'NumberInput',
  generateCode: (componentNode) => {
    const { width } = componentNode.bound;
    return {
      id: componentNode.id,
      tag: 'u-number-input',
      code: `<u-number-input style="width:${width}px" />`,
      name: '数字输入',
      reason: '进行数字输入和校验',
    };
  },
};

export default numberInput;
