/* 组件功能扩展插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils/plugins/index';
import { onMounted, watch } from '@vue/composition-api';
import { VNode } from 'vue';

export { useDataSource } from './data-source';

export const useExtendsPlugin: NaslComponentPluginOptions = {
  props: ['data', 'titleField', 'valueField', 'propsField', 'typeField', 'childrenField', 'iconField'],
  setup: (props, { h, setupContext: ctx }) => {
    const { get: propGet } = props;
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

    const renderMenuItems = (item, index) => {
      const value = item[propGet('valueField') as string || 'value'];
      const title = item[propGet('titleField') as string || 'title'] || '';
      return h('el-menu-item', {
        key: `menuitem-${index}-${value}`,
        attrs: {
          index: value,
          ...item[propGet('propsField') as string || 'props'],
        },
      }, [
        h('i', {
          class: item[propGet('iconField') as string || 'icon'],
        }),
        h('span', [title]),
      ]);
    };

    const renderMenuGroup = (item, index) => {
      const title = item[propGet('titleField') as string || 'title'] || '';
      const getDefault = () => {
        const children = item[propGet('childrenField') as string || 'children'];
        if (Array.isArray(children) && children.length > 0) {
          return children.map((child, cIndex) => renderMenuItems(child, cIndex));
        }
        return null;
      };
      return h('el-menu-item-group', {
        key: `menugroup-${index}-${item[propGet('valueField') as string || 'value']}`,
        attrs: {
          ...item[propGet('propsField') as string || 'props'],
        },
      }, [
        h('template', {
          slot: 'title',
        }, title),
        h('template', {
          slot: 'default',
        }, getDefault()),
      ]);
    };

    const renderSubMenu = (item, index) => {
      const icon = item[propGet('iconField') as string || 'icon'];
      const title = item[propGet('titleField') as string || 'title'] || '';
      const getDefault = () => {
        const children = item[propGet('childrenField') as string || 'children'];
        if (Array.isArray(children) && children.length > 0) {
          return children.map((child, cIndex) => {
            if (child[propGet('typeField') as string || 'type'] === 'group') {
              return renderMenuGroup(child, cIndex);
            }
            if (child[propGet('typeField') as string || 'type'] === 'submenu') {
              return renderSubMenu(child, cIndex);
            }
            return renderMenuItems(child, cIndex);
          });
        }
        return null;
      };
      return h('el-submenu', {
        key: `submenu-${index}-${item[propGet('valueField') as string || 'value']}`,
        attrs: {
          ...item[propGet('itemProps') as string],
        },
      }, [
        h('template', {
          slot: 'title',
        }, [h('i', {
          class: icon,
        }), h('span', [title])]),
        h('template', {
          slot: 'default',
        }, getDefault()),
      ]);
    };

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
        const data = propGet('data') || [];
        const [slotDefault, slotLeft, slotRight] = props.get<Array<() => VNode[]>>(['slotDefault', 'slotLeft', 'slotRight']);
        const typeField = propGet('typeField') as string || 'type';
        let vnodes: VNode[] = [];
        if (Array.isArray(data) && data.length > 0) {
          vnodes = data.map((item, i) => {
            if (item[typeField] === 'group') {
              return renderMenuGroup(item, i);
            }
            if (item[typeField] === 'submenu') {
              return renderSubMenu(item, i);
            }
            return renderMenuItems(item, i);
          });
        } else {
          vnodes = typeof slotDefault === 'function' ? slotDefault() : [];
        }
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
