/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/index';
import { onMounted, watch } from '@vue/composition-api';
import { VNode } from 'vue';

export const useExtendsPlugin: NaslComponentPluginOptions = {
  setup: (props, { h, setupContext: ctx }) => {
    const defaultActiveRef = props.useRef('defaultActive');

    function setDefaultActiveByRouter(routerInfo) {
      const routerPath = routerInfo?.path;
      const baseComponentInstance: any = ctx.refs.$base;

      if (!baseComponentInstance || !routerPath) {
        return;
      }

      Object.keys(baseComponentInstance.items).forEach((key) => {
        if (
          baseComponentInstance.items[key]
          && baseComponentInstance.items[key].destination
          && baseComponentInstance.items[key].destination.startsWith(routerPath)
        ) {
          defaultActiveRef.value = key;
        }
      });
    }
    watch(
      () => (ctx.parent as any).$route,
      (routerInfo) => {
        setDefaultActiveByRouter(routerInfo);
      },
    );

    onMounted(() => {
      setDefaultActiveByRouter((ctx.parent as any).$route);
    });

    return {
      router: false,
      defaultActive: defaultActiveRef,
      onSelect: (index, indexPath) => {
        const onSelect = props.get('onSelect');
        if (typeof onSelect === 'function') {
          onSelect({
            index,
            indexPath,
          });
        }
      },
      onOpen: (index, indexPath) => {
        const onOpen = props.get('onOpen');
        if (typeof onOpen === 'function') {
          onOpen({
            index,
            indexPath,
          });
        }
      },
      onClose: (index, indexPath) => {
        const onClose = props.get('onClose');
        if (typeof onClose === 'function') {
          onClose({
            index,
            indexPath,
          });
        }
      },
      slotDefault: () => {
        const mode = props.get('mode');
        const [slotDefault, slotLeft, slotRight] = props.get<Array<() => VNode[]>>(['slotDefault', 'slotLeft', 'slotRight']);

        let vnodes = typeof slotDefault === 'function' ? slotDefault() : [];
        if (!Array.isArray(vnodes)) {
          vnodes = [];
        } else {
          vnodes = [...vnodes];
        }

        if (mode === 'horizontal') {
          const leftNodes = typeof slotLeft === 'function' ? slotLeft() : [];
          const rightNodes = typeof slotRight === 'function' ? slotRight() : [];
          if (Array.isArray(leftNodes) && leftNodes.length > 0) {
            vnodes.unshift(...leftNodes);
          }

          if (Array.isArray(rightNodes) && rightNodes.length > 0) {
            vnodes.push(h('div', { class: 'el-menu__extra' }, rightNodes));
          }
        }

        return vnodes;
      },
    };
  },
};
