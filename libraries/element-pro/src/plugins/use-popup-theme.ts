import { VNode } from 'vue';
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import { PopupProps } from '@element-pro';
import { isFunction } from 'lodash';

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

export const usePopupTheme: NaslComponentPluginOptions = {
  setup(props, ctx) {
    const themeStyle = getThemeStyles(isFunction(ctx.getVNode) ? ctx.getVNode() : ctx.setupContext.parent.$vnode);

    return {
      popupProps: props.useComputed('popupProps', (popupProps = {}) => {
        return {
          ...popupProps,
          overlayStyle: {
            ...(popupProps.overlayStyle ?? {}),
            ...themeStyle,
          },
        } as PopupProps;
      }),
    };
  },
  order: 10,
};
