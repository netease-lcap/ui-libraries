import { ComponentConfig } from '../types';

const datePicker: ComponentConfig = {
  type: 'DatePicker',
  generateCode: (componentNode) => {
    const { width } = componentNode.bound;
    return {
      id: componentNode.id,
      tag: 'u-date-picker',
      code: `<u-date-picker style='width:${width}px' />`,
      name: '日期选择',
      reason: '进行日期选择',
    };
  },
};

export default datePicker;
