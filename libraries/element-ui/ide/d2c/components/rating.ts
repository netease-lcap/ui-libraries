import {
  ComponentCodeGen,
} from '../common';

const type = 'Rating';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode) => {
    return {
      id: componentNode.id,
      code: '<el-rate style="width: 125px"/>',
    };
  },
  name: '评分',
  reason: '进行评分',
  tag: 'el-rate',
};
