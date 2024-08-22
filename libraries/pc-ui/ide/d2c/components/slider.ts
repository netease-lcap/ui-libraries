import { ComponentConfig } from '../types';
import { styleObjToStr } from '../utils';

const slider: ComponentConfig = {
  type: 'Slider',
  generateCode: (componentNode) => {
    const { width } = componentNode.bound;
    const styleObj = {
      width: `${width}px`,
      marginTop: '-40px',
    };
    const styleStr = styleObjToStr(styleObj);

    return {
      id: componentNode.id,
      tag: 'u-combo-slider',
      code: `<u-combo-slider style="${styleStr}"/>`,
      name: '滑块',
      reason: '通过拖动进行数字选择',
    };
  },
};

export default slider;
