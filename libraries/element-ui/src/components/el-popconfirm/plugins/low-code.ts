/* 仅在 ide 环境生效的插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import { ref, getCurrentInstance } from '@vue/composition-api';
import { isFunction } from 'lodash';
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
      onClick() {
        visible.value = !visible.value;
        let nodepath;
        const popperRef = ctx.refs.$base?.$children?.[0]?.$refs?.popper;
        const baseEl = ctx.refs.$base?.$children?.[0]?.$refs?.wrapper;
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
