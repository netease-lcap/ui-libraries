import { VNode } from 'vue';
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import { PopupProps } from '@element-pro';
import { isFunction } from 'lodash';
import cls from 'classnames';

function getThemeStyles(vnode: VNode) {
  if (!vnode || !vnode.data || !vnode.data.staticStyle) {
    return {};
  }

  const style = {};
  Object.keys(vnode.data.staticStyle).forEach((key) => {
    if (key.startsWith('--')) {
      style[key] = vnode.data.staticStyle[key];
    }
  });

  return style;
}

function getOverlayClassName(vnode: VNode, overlayClassName: PopupProps['overlayClassName']) {
  let className = overlayClassName ?? [];

  if (!Array.isArray(className)) {
    className = [className];
  }

  const clx = cls(vnode.data?.class || [], vnode.data?.staticClass || '');
  const cssRuleClassName = clx?.split(' ')?.find((name) => /^cw-css-rule-?/.test(name)) || '';

  if (cssRuleClassName) {
    className.push(cssRuleClassName);
  }

  return className;
}

export const usePopupTheme: NaslComponentPluginOptions = {
  setup(props, ctx) {
    const themeStyle = getThemeStyles(isFunction(ctx.getVNode) ? ctx.getVNode() : ctx.setupContext.parent.$vnode);

    return {
      popupProps: props.useComputed('popupProps', (popupProps = {}) => {
        const overlayClassName = getOverlayClassName(isFunction(ctx.getVNode) ? ctx.getVNode() : ctx.setupContext.parent.$vnode, popupProps.overlayClassName);

        return {
          ...popupProps,
          overlayStyle: {
            ...(popupProps.overlayStyle ?? {}),
            ...themeStyle,
          },
          overlayClassName,
        } as PopupProps;
      }),
    };
  },
  order: 10,
};
