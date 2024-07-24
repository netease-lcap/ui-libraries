import { ComponentConfig } from '../types';

const searchInput: ComponentConfig = {
  type: 'SearchInput',
  generateCode: (componentNode, textNodes) => {
    const text = textNodes[0]?.attrs.text || '';
    const { width } = componentNode.bound;
    return {
      id: componentNode.id,
      tag: 'u-input',
      code: `
<u-input
    style='width:${width}px' 
    placeholder='${text}'
    prefix='search'
/>`,
      name: '搜索框',
      reason: '进行输入搜索',
    };
  },
};

export default searchInput;
