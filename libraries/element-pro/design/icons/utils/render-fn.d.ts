import { VNode, CreateElement, VNodeData } from 'vue';
import { SVGJson } from './types';
declare function renderFn(createElement: CreateElement, node: SVGJson, rootData: VNodeData): VNode;
export default renderFn;
