import { ComponentConfig } from '../types';

const timePicker: ComponentConfig = {
  type: 'TimePicker',
  generateCode: (componentNode) => {
    const { width } = componentNode.bound;
    return {
      id: componentNode.id,
      tag: 'u-time-picker',
      code: `<u-time-picker style='width:${width}px' />`,
      name: '时间选择',
      reason: '进行时间选择',
    };
  },
};

export default timePicker;
