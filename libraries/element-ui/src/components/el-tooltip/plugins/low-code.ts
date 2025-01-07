/* 仅在 ide 环境生效的插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import { ref, getCurrentInstance } from '@vue/composition-api';
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

export const useManualClickPlugin: NaslComponentPluginOptions = {
  setup(props, { setupContext: ctx }) {
    const visible = ref(false);
    const instance = getCurrentInstance();
    const popperClassValue = ref('');
    return {
      manual: true,
      value: visible,
      popperClass: popperClassValue,
      onClick(event: MouseEvent) {
        // IDE 撤销回退的时候没有重新执行mounted，referenceElm不对，导致展示位置错位，重新赋值
        if (ctx.refs.$base?.updatePopper) {
          ctx.refs.$base.referenceElm = ctx.refs.$base.$el;
        }
        visible.value = !visible.value;
        const popperRef = ctx.refs.$base?.$refs?.popper;
        let nodepath;
        const baseEl = instance?.refs?.$base?.$el;
        if (baseEl) {
          nodepath = baseEl.getAttribute('data-anonymous-nodepath') || baseEl.getAttribute('data-nodepath');
        }
        if (popperRef && nodepath) {
          popperRef.setAttribute('data-nodepath', nodepath);
        }
        const popperClass = props.get<string>('popperClass') || '';
        const cssRuleClassName = getCssRuleClassName(isFunction(ctx.getVNode) ? ctx.getVNode() : ctx?.parent?.$vnode, popperClass);
        popperClassValue.value = cssRuleClassName;
      },
    };
  },
  onlyUseIDE: true,
};
