import {
  styleObjToStr,
  ComponentCodeGen,
} from '../common';

const type = 'Slider';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode) => {
    const { width } = componentNode.bound;
    const styleObj = {
      width: `${width}px`,
      marginTop: '-40px',
    };
    const styleStr = styleObjToStr(styleObj);

    return {
      id: componentNode.id,
      code: `<el-slider-pro style="${styleStr}"/>`,
    };
  },
  name: '滑块',
  reason: '通过拖动进行数字选择',
  tag: 'el-slider-pro',
};
