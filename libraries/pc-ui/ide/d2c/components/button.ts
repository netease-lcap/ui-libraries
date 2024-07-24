import { ComponentConfig } from '../types';
import { getBackgroundColor, styleObjToStr } from '../utils';

const button: ComponentConfig = {
  type: 'Button',
  generateCode: (componentNode, textNodes, allNodes) => {
    const { text } = textNodes[0].attrs;
    const { width, height } = componentNode.bound;
    const background = getBackgroundColor(componentNode, allNodes);

    const { color } = textNodes[0].style;
    const styleObj = {
      width: `${width}px`,
      height: `${height}px`,
      'line-height': `${height}px`,
      padding: '0',
      background,
      color,
    };

    const styleStr = styleObjToStr(styleObj);
    return {
      id: componentNode.id,
      tag: 'u-button',
      code: `<u-button text="${text}" style="${styleStr}" />`,
      name: '按钮',
      reason: '进行鼠标滑过、点击等交互',
    };
  },
};

export default button;
