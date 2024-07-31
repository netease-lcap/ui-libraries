import { ComponentConfig } from '../types';

const numberInput: ComponentConfig = {
  type: 'NumberInput',
  generateCode: (componentNode) => {
    const { width } = componentNode.bound;
    return {
      id: componentNode.id,
      tag: 'van-stepper-new',
      code: `<van-stepper-new style="width:${width}px" :showPlus="true" :showMinus="true" />`,
      name: '数字输入',
      reason: '进行数字输入和校验',
    };
  },
};

export default numberInput;
