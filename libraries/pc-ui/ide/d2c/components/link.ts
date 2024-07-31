import { ComponentConfig } from '../types';
import { styleObjToStr } from '../utils';

const link: ComponentConfig = {
  type: 'Link',
  generateCode: (componentNode, textNodes) => {
    const { text } = textNodes[0].attrs;
    const { style } = componentNode;
    const styleObj = {
      'font-size': style['font-size'],
      color: style.color,
      'line-height': style['line-height'],
      'text-wrap': 'nowrap',
    };
    const styleStr = styleObjToStr(styleObj);
    return {
      id: componentNode.id,
      tag: 'u-link',
      code: `<u-link text="${text}" style="${styleStr}" />`,
      name: '链接',
      reason: '实现跳转或下载功能',
    };
  },
};

export default link;
