import {
  ComponentCodeGen,
} from '../common';

const type = 'Switch';
export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode) => {
    return {
      id: componentNode.id,
      code: '<el-switch-pro style="" />',
    };
  },
  name: '开关',
  reason: '进行开关',
  tag: 'el-switch-pro',
};
