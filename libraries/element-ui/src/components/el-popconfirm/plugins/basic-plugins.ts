import type { MapGet } from '@lcap/vue2-utils/plugins/types';
import { $deletePropList, type NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins';
import _, { camelCase, isFunction } from 'lodash';
import { getCurrentInstance, onMounted, onUpdated } from '@vue/composition-api';
import { VNode } from 'vue';
import cls from 'classnames';

export const useSetDialogStyles = (props: MapGet) => {
  const instance = getCurrentInstance();
  const setStyles = () => {
    const dialogStyle = props.get('dialogStyle');
    if (
      !dialogStyle
      || !instance
      || !instance.refs.$base
      || !(instance.refs.$base as any).$el
    ) {
      return;
    }

    // 初始时，popover挂在气泡确认框的warpper下，点击打开后，挂在了body下，不能直接从base.$el下获取dialogEl
    const popperRef = (instance.refs.$base as any)?.$children?.[0]?.$refs?.popper;
    const dialogEl = popperRef ? popperRef.querySelector('.el-popconfirm') as HTMLDivElement : undefined;
    if (!dialogEl) {
      return;
    }

    Object.keys(dialogStyle).forEach((key) => {
      dialogEl.style[camelCase(key)] = dialogStyle[key];
    });
  };

  onMounted(setStyles);
  onUpdated(setStyles);
};

export const usePopconfirm: NaslComponentPluginOptions = {
  setup: (props) => {
    useSetDialogStyles(props);
    return {
      [$deletePropList]: ['dialogStyle']
    };
  },
};

function getCssRuleClassName(vnode: VNode, popperClass: string) {
  const clx = cls(vnode.data?.class || [], vnode.data?.staticClass || '');
  const cssRuleClassName = clx?.split(' ')?.find((name) => /^cw-css-rule-?/.test(name)) || '';

  return `${popperClass} ${cssRuleClassName}`;
}

export const usePopperClass = {
  setup(props, ctx) {
    return {
      popperClass: props.useComputed('popperClass', (popperClass = '') => {
        const cssRuleClassName = getCssRuleClassName(isFunction(ctx.getVNode) ? ctx.getVNode() : ctx.setupContext.parent.$vnode, popperClass);

        return cssRuleClassName;
      }),
    };
  },
};
