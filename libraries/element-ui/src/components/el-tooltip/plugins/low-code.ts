/* 仅在 ide 环境生效的插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import {
  ref,
  getCurrentInstance,
  onMounted,
  onUnmounted,
} from '@vue/composition-api';
import _, { isFunction } from 'lodash';
import { VNode } from 'vue';
import cls from 'classnames';

function getCssRuleClassName(vnode: VNode | undefined, popperClass: string) {
  if (!vnode) {
    return popperClass;
  }
  const clx = cls(vnode.data?.class || [], vnode.data?.staticClass || '');
  const cssRuleClassName = clx?.split(' ')?.find((name) => /^cw-css-rule-?/.test(name)) || '';

  return `${popperClass} ${cssRuleClassName}`;
}

export const useManualClickPlugin: NaslComponentPluginOptions = {
  setup(props, context) {
    const ctx = context.setupContext;
    const visible = ref(false);
    const instance = getCurrentInstance();
    const popperClassValue = ref('');

    const setPopperClass = () => {
      const popperClass = props.get<string>('popperClass') || '';
      const cssRuleClassName = getCssRuleClassName(isFunction(context.getVNode) ? context.getVNode() : ctx?.parent?.$vnode, popperClass);
      popperClassValue.value = cssRuleClassName;
    };

    let observer;
    onMounted(() => {
      observer = new MutationObserver((mutationsList) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            setPopperClass();
          }
        }
      });

      const parentNode = ctx?.parent?.$vnode?.elm;
      if (parentNode) {
        observer.observe(parentNode, { attributes: true });
      }
    });

    onUnmounted(() => {
      if (observer) {
        observer.disconnect();
      }
    });

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
        setPopperClass();
      },
    };
  },
  onlyUseIDE: true,
};
