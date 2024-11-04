import {
  styleObjToStr,
  ComponentCodeGen,
} from '../common';

const type = 'Link';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes) => {
    const text = textNodes[0]?.attrs.text || '';
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
      code: `<el-link text="${text}" style="${styleStr}" />`,
    };
  },
  name: '链接',
  reason: '实现跳转或下载功能',
  tag: 'el-link',
};
