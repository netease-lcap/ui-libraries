import {
  ComponentCodeGen,
  NodeWithAbsoluteBound,
  styleObjToStr,
} from '../common';

const type = 'Tabs';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes) => {
    const { width } = componentNode.style;
    const styleStr = styleObjToStr({ width });
    const tabsContainerWidth = componentNode.bound.width;
    const tabsWidth = Math.max(tabsContainerWidth, 500);
    // 通过 textNodes 生成 tab
    const tabCode = textNodes
      // tabs 文字顺序
      .sort((a, b) => a.absoluteBound.x - b.absoluteBound.x)
      .map((textNode, i) => {
        const { text } = textNode.attrs;
        return `
    <el-tab value="v${i}">
        <template #title>
            <el-text text="${text}"></el-text>
        </template>
    </el-tab>
      `;
      })
      .join('\n');

    return {
      id: componentNode.id,
      code: `
<el-linear-layout style="${styleStr}">
  <el-tabs style="width: ${tabsWidth}px" value="v0">
      ${tabCode}
      <template #extra></template>
      <template #title="current"></template>
      <template #content="current"></template>
  </el-tabs>
</el-linear-layout>
            `,
    };
  },
  name: '选项卡',
  reason: '切换页面内容',
  tag: 'el-linear-layout',
};
