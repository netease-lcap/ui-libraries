import {
  ComponentCodeGen,
  styleObjToStr,
} from '../common';

const type = 'Capsules';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes) => {
    const { width } = componentNode.style;
    const styleStr = styleObjToStr({ width });
    // 通过 textNodes 生成 tab
    const tabCode = textNodes
      // capsules 文字顺序
      .sort((a, b) => a.absoluteBound.x - b.absoluteBound.x)
      .map((textNode, i) => {
        const { text } = textNode.attrs;
        return `
    <el-radio-pro value="v${i}">
      <el-text text="${text}"></el-text>
    </el-radio-pro>
      `;
      })
      .join('\n');

    return {
      id: componentNode.id,
      code: `
  <el-radio-group-pro style="${styleStr}" value="v0" shape="button">
      ${tabCode}
  </el-radio-group-pro>
            `,
    };
  },
  name: '胶囊',
  reason: '切换页面内容',
  tag: 'el-radio-group-pro',
};
