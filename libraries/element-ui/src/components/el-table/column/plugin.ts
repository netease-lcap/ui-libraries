import { NaslComponentPluginOptions, SEmpty } from '@lcap/nasl-hoc-vue/index';
import {
  inject, onBeforeMount, onMounted, useAttrs,
} from '@vue/composition-api';
import { at } from 'lodash';
import { uid } from 'uid';

export const useSlotHeaderEmpty: NaslComponentPluginOptions = {
  setup: (props, { h, setupContext: ctx }) => {
    const attrs = useAttrs();
    const type = props.get('type');
    const scopedId = uid();
    const uuid = `th_${scopedId}`;
    const addTableCell: any = inject('addTableCell');

    onMounted(() => {
      if (addTableCell) {
        const vusionProps = {
        };

        Object.keys(attrs).forEach((key) => {
          if (key.startsWith('vusion')) {
            vusionProps[key] = attrs[key];
          }
        });

        addTableCell({
          id: uuid,
          ins: ctx.refs.$base,
          attrs: vusionProps,
        });
      }
    });

    if (type === 'selection') {
      return {
        type: '',
        width: props.useComputed('width', (width) => width || '50px'),
        slotHeader: () => {
          return h('el-checkbox', {
            attrs: {
              id: uuid,
            },
          });
        },
        slotDefault: () => {
          return h('el-checkbox', {
            attrs: {
              id: uuid,
            },
          });
        },
      };
    }

    if (type) {
      return {
        slotHeader: () => {
          const label = props.get<string>('label');
          return h('div', {
            attrs: {
              id: uuid,
            },
          }, [label || '']);
        },
      };
    }

    return {
      slotHeader: () => {
        const slot = props.get('slotHeader');
        const vnodes = typeof slot === 'function' ? slot({}) : null;
        const sempty = !vnodes || vnodes.length === 0 ? [h(SEmpty)] : vnodes;

        return h('div', {
          attrs: {
            'vusion-slot-name': 'header',
            id: uuid,
          },
        }, [sempty]);
      },
    };
  },
  order: 11,
  onlyUseIDE: true,
};

export const useSlotDefaultEmpty: NaslComponentPluginOptions = {
  setup: (props, { h, setupContext: ctx }) => {
    const attrs = useAttrs();
    const type = props.get('type');
    const scopedId = uid();
    const uuid = `td_${scopedId}`;
    const addTableCell: any = inject('addTableCell');

    if (type === 'index' || type === 'selection') {
      return;
    }

    onMounted(() => {
      if (addTableCell) {
        const vusionProps = {
          'vusion-next': true,
        };

        Object.keys(attrs).forEach((key) => {
          if (key.startsWith('vusion')) {
            vusionProps[key] = attrs[key];
          }
        });

        addTableCell({
          id: uuid,
          ins: ctx.refs.$base,
          attrs: vusionProps,
        });
      }
    });

    return {
      slotDefault: (current) => {
        const slot = props.get('slotDefault');
        const vnodes = typeof slot === 'function' ? slot(current) : null;
        const sempty = !vnodes || vnodes.length === 0 ? [h(SEmpty)] : vnodes;

        return h('div', {
          attrs: {
            'vusion-slot-name': 'default',
            id: uuid,
          },
        }, [sempty]);
      },
    };
  },
  order: 11,
  onlyUseIDE: true,
};

export const useField2Prop: NaslComponentPluginOptions = {
  props: ['field'],
  setup: (props, { setupContext: ctx }) => {
    return {
      prop: props.useComputed('field'),
      minWidth: props.useComputed('minWidth', (v) => v || '120px'),
    };
  },
  order: 2,
};

export const useAutoSetIndex: NaslComponentPluginOptions = {
  setup: (props, {}) => {
    const getPagination = inject('getPagination');

    const index = props.useComputed(['index', 'type'], (i, type) => {
      if (type !== 'index' || typeof getPagination !== 'function' || i) {
        return i;
      }

      return (n) => {
        const { currentPage, pageSize } = getPagination();

        return n + (currentPage - 1) * pageSize + 1;
      };
    });

    return {
      index,
    };
  },
};
