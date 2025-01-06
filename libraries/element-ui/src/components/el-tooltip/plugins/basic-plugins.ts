import _, { isFunction } from 'lodash';
import { VNode } from 'vue';
import cls from 'classnames';

function getCssRuleClassName(vnode: VNode, popperClass: string) {
  if (!vnode) {
    return popperClass;
  }
  const clx = cls(vnode.data?.class || [], vnode.data?.staticClass || '');
  const cssRuleClassName = clx?.split(' ')?.find((name) => /^cw-css-rule-?/.test(name)) || '';

  return `${popperClass} ${cssRuleClassName}`;
}

export const usePopperClass = {
  setup(props, ctx) {
    return {
      popperClass: props.useComputed('popperClass', (popperClass = '') => {
        const cssRuleClassName = getCssRuleClassName(
          isFunction(ctx.getVNode) ? ctx.getVNode() : ctx.setupContext?.parent?.$vnode,
          popperClass,
        );

        return cssRuleClassName;
      }),
    };
  },
};
