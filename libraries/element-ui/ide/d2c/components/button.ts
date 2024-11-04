import {
  styleObjToStr,
  ComponentCodeGen,
} from '../common';

const type = 'Button';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode, textNodes, allNodes) => {
    const text = textNodes[0]?.attrs.text || '';
    const { width } = componentNode.bound;
    const { height } = componentNode.bound;
    // 找到所有 width height x y 相差不超过2 的节点
    const nodes = allNodes.filter((node) => {
      return (
        Math.abs(node.bound.width - width) <= 2
        && Math.abs(node.bound.height - height) <= 2
        && Math.abs(node.absoluteBound.x - componentNode.absoluteBound.x) <= 2
        && Math.abs(node.absoluteBound.y - componentNode.absoluteBound.y) <= 2
      );
    });
    const background = nodes.map((node) => node.style.background).find((color) => color) || '';
    const color = textNodes[0]?.style.color || '';
    const styleObj = {
      width: componentNode.style.width,
      height: componentNode.style.height,
      background,
      color,
    };

    const styleStr = styleObjToStr(styleObj);
    return {
      id: componentNode.id,
      code: `<el-button text="${text}" style="${styleStr}" />`,
    };
  },
  name: '按钮',
  reason: '进行鼠标滑过、点击等交互',
  tag: 'el-button',
};
