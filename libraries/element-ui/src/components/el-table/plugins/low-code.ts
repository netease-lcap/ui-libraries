/* 仅在 ide 环境生效的插件 */
import { NaslComponentPluginOptions } from '@lcap/nasl-hoc-vue/index';
import {
  onMounted,
  onUpdated,
  provide,
  shallowRef,
} from '@vue/composition-api';

const getScopeId = (el: Element) => {
  if (!el) {
    return '';
  }

  for (let i = 0; i < el.attributes.length; i++) {
    const { name } = el.attributes[0];
    if (name.startsWith('data-v')) {
      return name;
    }
  }

  return '';
};

const getCellElement = (el: Element | null) => {
  if (!el) {
    return;
  }

  let ele = el.parentElement;

  if (!ele) {
    return;
  }

  let tag = ele.tagName.toLowerCase();

  if (tag === 'th' || tag === 'td') {
    return ele;
  }

  ele = ele.parentElement;

  if (!ele) {
    return;
  }

  tag = ele.tagName.toLowerCase();

  if (tag === 'th' || tag === 'td') {
    return ele;
  }
};

export const useSetVusionAttrs: NaslComponentPluginOptions = {
  setup: (props, { setupContext: ctx }) => {
    const cellList = shallowRef<any[]>([]);
    let mounted = false;
    const setVusionAttrs = ({ id, ins, attrs }) => {
      const element: Element = (ctx.refs.$base as any).$parent.$el;
      const scopedId = getScopeId(element);
      const el = document.getElementById(id);
      const cell = getCellElement(el);

      if (!cell) {
        return;
      }

      cell.__Vue__ = ins;

      Object.keys(attrs || {}).forEach((k) => {
        cell.setAttribute(k, attrs[k]);
      });

      cell.setAttribute('vusion-scope-id', scopedId);
    };

    onMounted((...args) => {
      mounted = true;
      cellList.value.forEach(setVusionAttrs);
    });

    onUpdated(() => {
      cellList.value.forEach(setVusionAttrs);
    });

    provide('addTableCell', (cell) => {
      const arr = [...cellList.value];
      arr.push(cell);

      cellList.value = arr;
      if (mounted) {
        ctx.root.$nextTick(() => {
          setVusionAttrs(cell);
        });
      }
    });
  },
  onlyUseIDE: true,
  order: 11,
};
