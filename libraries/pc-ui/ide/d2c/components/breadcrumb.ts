import { ComponentConfig } from '../types';
import { styleObjToStr } from '../utils';

const breadcrumb: ComponentConfig = {
  type: 'Breadcrumb',
  generateCode: (componentNode, textNodes) => {
    const styleObj = {};
    const styleStr = styleObjToStr(styleObj);
    const itemCode = textNodes
      .map((textNode) => {
        const { text } = textNode.attrs;
        return `<u-crumb-item><u-text text="${text}" /></u-crumb-item>`;
      })
      .join('\n');
    return {
      id: componentNode.id,
      tag: 'u-crumb',
      code: `
<u-crumb style="${styleStr}" >
    ${itemCode}
</u-crumb>
            `,
      name: '面包屑',
      reason: '进行路径导航',
    };
  },
};

export default breadcrumb;
