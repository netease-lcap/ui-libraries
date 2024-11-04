import {
  ComponentCodeGen,
  styleObjToStr,
} from '../common';

const type = 'Breadcrumb';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes) => {
    const styleObj = {};
    const styleStr = styleObjToStr(styleObj);
    const itemCode = textNodes
      .map((textNode) => {
        const { text } = textNode.attrs;
        return `<el-breadcrumb-item><el-text text="${text}" /></el-breadcrumb-item>`;
      })
      .join('\n');

    return {
      id: componentNode.id,
      code: `
<el-breadcrumb style="${styleStr}" >
    ${itemCode}
</el-breadcrumb>
            `,
    };
  },
  name: '面包屑',
  reason: '进行路径导航',
  tag: 'el-breadcrumb',
};
