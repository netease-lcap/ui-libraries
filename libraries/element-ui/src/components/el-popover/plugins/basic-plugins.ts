import { $ref } from '@lcap/vue2-utils';
import { onBeforeUnmount } from '@vue/composition-api';
import { isFunction } from 'lodash';
import { VNode } from 'vue';
import cls from 'classnames';

export const useTrigger = {
  setup(props, ctx) {
    const trigger = props.useRef('trigger', (v) => v || 'hover');
    const value = props.useRef('value', (v) => v || false);

    onBeforeUnmount(() => {
      trigger.value = 'manual';
      value.value = false;
    });

    return {
      trigger,
      value,
      onInput(v) {
        value.value = v;
        const [updateValue, onInput] = props.get(['update:value', 'onInput']);

        if (isFunction(updateValue)) {
          updateValue(v);
        }

        if (isFunction(onInput)) {
          onInput(v);
        }
      },
      [$ref]: {
        open: () => {
          value.value = true;
        },
        close: () => {
          value.value = false;
        },
      },
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
