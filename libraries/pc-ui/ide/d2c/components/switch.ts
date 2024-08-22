import { ComponentConfig } from '../types';

const swtich: ComponentConfig = {
  type: 'Switch',

  generateCode: (componentNode) => {
    return {
      id: componentNode.id,
      tag: 'u-switch',
      code: '<u-switch />',
      name: '开关',
      reason: '进行开关',
    };
  },
};

export default swtich;
