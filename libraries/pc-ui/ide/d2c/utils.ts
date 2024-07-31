import { ICodeWaveNode } from './types';

/**
 * 输入 style obj 返回行内样式字符串
 */
export function styleObjToStr(style: { [key: string]: string }) {
  return Object.entries(style)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ');
}

/**
 * 获取背景色
 */
export function getBackgroundColor(componentNode: ICodeWaveNode, allNodes: ICodeWaveNode[]) {
  const { width, height } = componentNode.bound;
  // 找到所有 width height x y 相差不超过2 的节点
  const nodes = allNodes.filter((node) => {
    return (
      Math.abs(node.bound.width - width) <= 2
      && Math.abs(node.bound.height - height) <= 2
      && Math.abs(node.absoluteBound.x - componentNode.absoluteBound.x) <= 2
      && Math.abs(node.absoluteBound.y - componentNode.absoluteBound.y) <= 2
    );
  });
  const background = nodes
    .map((node) => node.style.background)
    .find((color) => color) || '';
  return background;
}

export function randomString(str: string) {
  // 相同的输入，输出相同的结果，只能包括数字和字母
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charCodeAt(i);
    hash = (hash * 32) - hash + char;
    // eslint-disable-next-line no-bitwise
    hash &= hash;
  }
  return hash.toString(36).replace(/[^\w]+/g, '');
}
