import {
  ComponentCodeGen,
  styleObjToStr,
} from '../common';

const type = 'SearchInput';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes) => {
    const text = textNodes[0]?.attrs.text || '';
    const { width } = componentNode.style;
    const styleStr = styleObjToStr({ width });
    return {
      id: componentNode.id,
      code: `
<el-input
  style='${styleStr}' 
  placeholder='${text}'
  prefix='search'
/>`,
    };
  },
  name: '搜索框',
  reason: '进行输入搜索',
  tag: 'el-input',
};
