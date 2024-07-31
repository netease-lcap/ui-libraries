import { ComponentConfig } from '../types';

const rating: ComponentConfig = {
  type: 'Rating',
  generateCode: (componentNode) => {
    return {
      id: componentNode.id,
      tag: 'u-rate',
      code: '<u-rate style="width: 125px"/>',
      name: '评分',
      reason: '进行评分',
    };
  },
};

export default rating;
