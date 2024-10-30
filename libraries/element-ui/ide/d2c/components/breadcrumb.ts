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
        return `<el-crumb-item><el-text text="${text}" /></el-crumb-item>`;
      })
      .join('\n');

    return {
      id: componentNode.id,
      code: `
<el-crumb style="${styleStr}" >
    ${itemCode}
</el-crumb>
            `,
    };
  },
  name: '面包屑',
  reason: '进行路径导航',
  tag: 'el-crumb',
};
