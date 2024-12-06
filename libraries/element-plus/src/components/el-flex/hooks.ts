import {
  Fragment,
  getCurrentInstance,
  RendererElement,
  RendererNode,
  VNode,
  VNodeArrayChildren,
  VNodeChild,
} from 'vue';
import { isArray } from 'lodash';

/**
 * 渲染default slot，获取slot child
 * @param childComponentName
 * @param slots
 * @example const getChildSlots = useChildSlots()
 * @example getChildSlots()
 */
export function useChildSlots(): () => (
  | VNode<
      RendererNode,
      RendererElement,
      {
        [key: string]: any;
      }
    >
  | VNodeArrayChildren
  | VNodeChild
)[] {
  const instance = getCurrentInstance();
  return () => {
    const { slots } = instance as any;
    const content = slots?.default?.() || [];

    return content
      .filter((item) => {
        if (typeof item.type === 'symbol' && !item.children) {
          return false;
        }
        return item.type !== Comment;
      })
      .map((item) => {
        if (item.children && isArray(item.children) && item.type === Fragment) return item.children;
        return item;
      })
      .flat();
  };
}
