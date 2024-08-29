import type { VNode } from 'vue';
import { type SubmitContext, type ValidateResultContext, Space } from '@element-pro';
import { type NaslComponentPluginOptions, $ref } from '@lcap/vue2-utils';
import { isEmptyVNodes } from '@lcap/vue2-utils/plugins/utils';
import { getCurrentInstance, provide } from '@vue/composition-api';
import {
  LabelWidthType,
  FORM_DEFAULT_LAYOUT,
  GutterType,
  FORM_CONTEXT,
} from '../constants';
import type { FormExtendsContext, LayoutMode } from '../types';

const getTemplateCount = (counts: number | string) => {
  if (!Number.isNaN(counts as number) || typeof counts === 'string') {
    return `repeat(${counts}, minmax(0,1fr))`;
  }

  return counts;
};

/* 组件功能扩展插件 */
export const useExtensPlugin: NaslComponentPluginOptions = {
  props: ['layoutMode', 'labelWidthType', 'gutterType', 'gutter', 'labelEllipsis', 'repeat'],
  setup(props, { h }) {
    const { useComputed } = props;
    const instance = getCurrentInstance();
    const labelWidth = useComputed(['labelWidthType', 'labelWidth'], (
      labelWidthType = '',
      width = '100px',
    ) => {
      if (!labelWidthType) {
        return width;
      }

      return LabelWidthType[labelWidthType];
    });

    const gutterSize = useComputed(['gutterType', 'gutter'], (
      gutterType = 'medium',
      gutter,
    ) => {
      if (!gutterType) {
        return gutter;
      }

      return GutterType[gutterType];
    });

    const style = useComputed(['layoutMode', 'repeat'], (
      layoutMode: LayoutMode,
      repeat = 4,
    ) => {
      if (layoutMode !== 'grid') {
        return {};
      }

      return {
        gridTemplateColumns: getTemplateCount(repeat),
        gap: gutterSize.value,
      };
    });

    const className = useComputed('layoutMode', (layoutMode: LayoutMode) => {
      if (layoutMode === 'grid') {
        return 'el-p-form--grid';
      }

      return undefined;
    });

    provide<FormExtendsContext>(FORM_CONTEXT, {
      labelWidth,
      labelEllipsis: useComputed('labelEllipsis', (v) => !!v),
    });

    return {
      labelWidth,
      layout: 'vertical',
      style,
      class: className,
      onSubmit: (context: SubmitContext) => {
        const onSubmit = props.get<(e: any) => void>('onSubmit') || (() => {});
        onSubmit({
          ...context,
          valid: context.validateResult === true,
        });
      },
      onValidate: (context: ValidateResultContext<any>) => {
        const onValidate = props.get<(e: any) => void>('onValidate') || (() => {});
        onValidate({
          ...context,
          valid: context.validateResult === true,
        });
      },
      slotDefault() {
        const layoutMode = props.get<LayoutMode>('layoutMode') || FORM_DEFAULT_LAYOUT;
        const slotDefault = props.get<any>('slotDefault') || (() => []);
        const vnodes: VNode[] = slotDefault();
        if (isEmptyVNodes(vnodes)) {
          return null;
        }

        if (layoutMode === 'linear') {
          const direction = props.get('layout') === 'inline' ? 'horizontal' : 'vertical';
          return h(Space, {
            attrs: {
              direction,
              breakLine: true,
              size: gutterSize.value,
            },
            style: {
              width: direction === 'vertical' ? '100%' : '',
            },
          }, vnodes);
        }

        if (layoutMode === 'grid') {
          return vnodes.map((vnode) => {
            const colSpan = vnode.data && vnode.data.attrs && vnode.data.attrs.colSpan ? vnode.data.attrs.colSpan : 1;
            const colStyle = {
              gridRowStart: 'initial',
              gridRowEnd: 'span 1',
              gridColumnStart: 'initial',
              gridColumnEnd: `span ${colSpan}`,
            };
            return h('div', { style: colStyle }, [vnode]);
          });
        }

        return vnodes;
      },
      [$ref]: {
        async validate(params = null) {
          if (!instance || !instance.refs || !instance.refs.$base) {
            return false;
          }

          const result = await (instance.refs.$base as any).validate(params);
          return result === true;
        },
        getFormData: async () => {
          return {
            name: '哈哈哈',
            type: '1111',
          };
        },
      },
    };
  },
};
