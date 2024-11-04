import {
  ComponentCodeGen,
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
    <el-tab-pane value="v${i}">
        <template #label>
            <el-text text="${text}"></el-text>
        </template>
        <el-text #default text="内容"></el-text>
    </el-tab-pane>
      `;
      })
      .join('\n');

    return {
      id: componentNode.id,
      code: `
<el-flex style="${styleStr}">
  <el-tabs style="width: ${tabsWidth}px" value="v0">
      ${tabCode}
  </el-tabs>
</el-flex>
            `,
    };
  },
  name: '选项卡',
  reason: '切换页面内容',
  tag: 'el-tabs',
};
