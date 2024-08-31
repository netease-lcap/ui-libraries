import Vue, { type VNode } from 'vue';
import {
  type SubmitContext,
  type ValidateResultContext,
  Space,
} from '@element-pro';
import {
  isObject,
  set as lodashSet,
  get as lodashGet,
  cloneDeep,
  isNil,
  isFunction,
} from 'lodash';
import { type NaslComponentPluginOptions, $ref } from '@lcap/vue2-utils';
import { isEmptyVNodes } from '@lcap/vue2-utils/plugins/utils';
import {
  getCurrentInstance,
  provide,
  reactive,
  toRaw,
} from '@vue/composition-api';
import {
  LabelWidthType,
  FORM_DEFAULT_LAYOUT,
  GutterType,
  FORM_CONTEXT,
  LCAP_FORM_UID,
} from '../constants';
import type {
  FormExtendsContext,
  FormField,
  FormFieldOptions,
  FormRangeField,
  FormRangeFieldOptions,
  InitFieldOptions,
  LayoutMode,
} from '../types';

const getTemplateCount = (counts: number | string) => {
  if (!Number.isNaN(counts as number) || typeof counts === 'string') {
    return `repeat(${counts}, minmax(0,1fr))`;
  }

  return counts;
};

export interface FormFieldMata {
  bindValue: any;
  change?: ((v: any) => void) | null;
  fieldControl?: FormField | FormRangeField;
}

function splitNameToPath(name) {
  return name.replace(/\[/g, '.').replace(/\]/g, '').split('.');
}

function deepVueSet(data: any, name: string, value: any) {
  const keys = splitNameToPath(name);
  let current = data;
  while (true) {
    const key = keys.shift();
    const val = current[key];
    if (keys.length === 0) {
      if (val === undefined) {
        Vue.set(current, key, value);
      }
      break;
    }

    const nextKey = key;
    if (!Number.isNaN(Number(nextKey)) && !Array.isArray(val)) {
      Vue.set(current, key, []);
    } else if (!Array.isArray(val) && !isObject(val)) {
      Vue.set(current, key, {});
    }

    current = current[key];
  }
}

const normalizeRangeFieldValue = (startValue, endValue) => {
  if (isNil(startValue) && isNil(endValue)) {
    return null;
  }

  return [startValue, endValue];
};

/* 组件功能扩展插件 */
export const useExtensPlugin: NaslComponentPluginOptions = {
  props: [
    'layoutMode', 'labelWidthType', 'gutterType',
    'gutter', 'labelEllipsis', 'repeat', 'clearFieldOnDestroy',
  ],
  setup(props, { h }) {
    const { useComputed } = props;
    const instance = getCurrentInstance();
    const formData = reactive({});
    const formFieldMetas: Record<string, FormFieldMata> = {};

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

    function initField({ name, value = null, change }: InitFieldOptions) {
      if (formFieldMetas[name]) {
        return;
      }

      deepVueSet(formData, name, value);

      formFieldMetas[name] = {
        bindValue: value,
        change,
      };
    }

    function removeField(name) {
      if (!name) {
        return;
      }
      delete formFieldMetas[name];
      const clearFieldOnDestroy = props.get<boolean>('clearFieldOnDestroy');
      if (clearFieldOnDestroy || name.startsWith(LCAP_FORM_UID)) {
        lodashSet(formData, name, null);
      }
    }

    function setFormData(d: Record<string, any>) {
      if (!isObject(d)) {
        return;
      }

      Object.assign(formData, d);
      Object.keys(formFieldMetas).forEach((key) => {
        if (typeof formFieldMetas[key].change !== 'function') {
          return;
        }

        const val = lodashGet(d, key);
        if (val === undefined) {
          return;
        }

        formFieldMetas[key].change(val);
      });
    }

    function setFieldValue(key: string, value: any) {
      if (!key) {
        return;
      }

      lodashSet(formData, key, value);
      if (formFieldMetas[key] && typeof formFieldMetas[key].change === 'function') {
        formFieldMetas[key].change(value);
      }
    }

    function getFieldValue(key: string) {
      return lodashGet(formData, key);
    }

    function initFormField({ name, value }: FormFieldOptions) {
      if (formFieldMetas[name]) {
        return formFieldMetas[name].fieldControl as FormField;
      }

      deepVueSet(formData, name, value);

      let initialSetted = false;
      const formField: FormField = {
        name,
        setValue: (v) => {
          setFieldValue(name, v);
        },
        getValue: () => getFieldValue(name),
        setInitalValue: (v) => {
          if (initialSetted) {
            return;
          }
          setFieldValue(name, v);
          initialSetted = true;
        },
        setChangeListener: (listener) => {
          if (formFieldMetas[name]) {
            formFieldMetas[name].change = listener;
          }
        },
      };
      formFieldMetas[name] = {
        bindValue: value,
        fieldControl: formField,
      };

      return formField;
    }

    function initFormRangeField({ name, uid, value }: FormRangeFieldOptions) {
      if (formFieldMetas[uid]) {
        return formFieldMetas[uid].fieldControl as FormRangeField;
      }

      deepVueSet(formData, uid, normalizeRangeFieldValue(value[0], value[1]));
      const [startName, endName] = name;
      [startName, endName].forEach((n, i) => {
        if (n) {
          deepVueSet(formData, n, value[i]);
          formFieldMetas[n] = {
            bindValue: value[i],
          };
        }
      });

      let initialSetted = false;
      const formRangeField: FormRangeField = {
        uid,
        name,
        setValue: (index, v) => {
          if (name[index]) {
            setFieldValue(name[index], v);
          }

          const values = [...(getFieldValue(uid) || [])];
          values[index] = v;
          setFieldValue(uid, normalizeRangeFieldValue(values[0], values[1]));
        },
        getValue: (index) => getFieldValue(name[index]),
        setInitalValue: (values) => {
          if (initialSetted) {
            return;
          }
          initialSetted = true;
          [startName, endName].forEach((n, i) => {
            if (n) {
              setFieldValue(n, values[i]);
            }
          });

          setFieldValue(uid, normalizeRangeFieldValue(values[0], values[1]));
        },
        setChangeListener: (startListener, endListener) => {
          if (startName && formFieldMetas[startName]) {
            formFieldMetas[startName].change = startListener;
          }

          if (endName && formFieldMetas[endName]) {
            formFieldMetas[endName].change = endListener;
          }

          if (formFieldMetas[uid]) {
            formFieldMetas[uid].change = (v) => {
              const [startValue, endValue] = v || [];
              if (!startName || isFunction(startListener)) {
                startListener(startValue);
              }

              if (!endName || isFunction(endListener)) {
                endListener(endValue);
              }
            };
          }
        },
      };

      return formRangeField;
    }

    function getFormData() {
      const d = cloneDeep(toRaw(formData));
      Object.keys(d).forEach((key) => {
        if (key.startsWith(LCAP_FORM_UID)) {
          delete d[key];
        }
      });
      return d;
    }

    provide<FormExtendsContext>(FORM_CONTEXT, {
      labelWidth,
      labelEllipsis: useComputed('labelEllipsis', (v) => !!v),
      setFieldValue,
      getFieldValue,
      initField,
      removeField,
      initFormField,
      initFormRangeField,
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
        async validate() {
          if (!instance || !instance.refs || !instance.refs.$base) {
            return { valid: false };
          }

          const result = await (instance.refs.$base as any).validate();
          return {
            valid: result === true,
          };
        },
        resetForm() {
          const resetType = props.get('resetType') || 'empty';
          Object.keys(formFieldMetas).forEach((key) => {
            if (resetType === 'initial') {
              setFieldValue(key, formFieldMetas[key].bindValue === undefined ? null : formFieldMetas[key].bindValue);
              return;
            }
            setFieldValue(key, null);
          });
        },
        setFormData,
        getFormData,
        setFieldValue,
        getFieldValue,
      },
    };
  },
};
