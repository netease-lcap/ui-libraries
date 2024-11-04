/* eslint-disable prefer-destructuring */
import { type VNode } from 'vue';
import {
  type SubmitContext,
  type ValidateResultContext,
  Space,
} from '@element-pro';
import { isFunction } from 'lodash';
import {
  type NaslComponentPluginOptions,
  $deletePropList,
  $ref,
} from '@lcap/vue2-utils';
import { isEmptyVNodes } from '@lcap/vue2-utils/plugins/utils';
import { getCurrentInstance, provide } from '@vue/composition-api';
import {
  LabelWidthType,
  FORM_DEFAULT_LAYOUT,
  GutterType,
  FORM_CONTEXT,
} from '../constants';
import type { FormExtendsContext, LayoutMode } from '../types';
import { useForm, useFormItemControls } from '../hooks';
import { getTemplateCount } from '../utils';

/* 组件功能扩展插件 */
export const useExtensPlugin: NaslComponentPluginOptions = {
  props: [
    'layoutMode',
    'labelWidthType',
    'gutterType',
    'gutter',
    'labelEllipsis',
    'repeat',
    'clearFieldOnDestroy',
  ],
  setup(props, { h }) {
    const { useComputed } = props;
    const instance = getCurrentInstance();
    const {
      addFormItemInstance,
      removeFormItemInstance,
      resetFormItemNeedReset,
    } = useFormItemControls();

    const labelWidth = useComputed(
      ['labelWidthType', 'labelWidth'],
      (labelWidthType = '', width = '100px') => {
        if (!labelWidthType) {
          return width;
        }

        return LabelWidthType[labelWidthType];
      },
    );

    const gutterSize = useComputed(
      ['gutterType', 'gutter'],
      (gutterType = 'medium', gutter) => {
        if (gutter) {
          return gutter;
        }

        return GutterType[gutterType];
      },
    );

    const style = useComputed(
      ['layoutMode', 'repeat'],
      (layoutMode: LayoutMode, repeat = 4) => {
        if (layoutMode !== 'grid') {
          return {};
        }

        return {
          gridTemplateColumns: getTemplateCount(repeat),
          gap: gutterSize.value,
        };
      },
    );

    const className = useComputed('layoutMode', (layoutMode: LayoutMode) => {
      if (layoutMode === 'grid') {
        return 'el-p-form--grid';
      }

      return undefined;
    });

    const {
      formData,
      formFieldMetas,
      initFormField,
      initFormRangeField,
      setFieldValue,
      getFieldValue,
      setFormData,
      getFormData,
      removeFieldCollect,
    } = useForm(props);

    const resetForm = () => {
      const onReset = props.get('onReset');

      if (instance.refs.$base) {
        (instance.refs.$base as any).clearValidate();
      }

      Object.keys(formFieldMetas).forEach((key) => {
        setFieldValue(
          key,
          formFieldMetas[key].initialValue === undefined
            ? null
            : formFieldMetas[key].initialValue,
        );
      });

      resetFormItemNeedReset();

      if (isFunction(onReset)) {
        onReset();
      }
    };

    const validate = async () => {
      if (!instance || !instance.refs || !instance.refs.$base) {
        return { valid: false };
      }

      const result = await (instance.refs.$base as any).validate();
      return {
        valid: result === true,
      };
    };

    provide<FormExtendsContext>(FORM_CONTEXT, {
      labelWidth,
      labelEllipsis: useComputed('labelEllipsis', (v) => !!v),
      setFieldValue,
      getFieldValue,
      removeField: removeFieldCollect,
      initFormField,
      initFormRangeField,
      addFormItemInstance,
      removeFormItemInstance,
    });

    return {
      labelWidth,
      layout: 'vertical',
      style,
      class: className,
      data: formData,
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
          return h(
            Space,
            {
              attrs: {
                direction,
                breakLine: true,
                size: gutterSize.value,
              },
              style: {
                width: direction === 'vertical' ? '100%' : '',
              },
            },
            vnodes,
          );
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
      [$deletePropList]: ['onReset'],
      [$ref]: {
        validate,
        resetForm,
        setFormData,
        getFormData,
        setFieldValue,
        getFieldValue,
      },
    };
  },
};
