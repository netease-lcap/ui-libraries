/* eslint-disable prefer-destructuring */
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
import { type NaslComponentPluginOptions, $deletePropList, $ref } from '@lcap/vue2-utils';
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
  LayoutMode,
} from '../types';

const getTemplateCount = (counts: number | string) => {
  if (!Number.isNaN(counts as number) || typeof counts === 'string') {
    return `repeat(${counts}, minmax(0,1fr))`;
  }

  return counts;
};

export interface FormFieldMata {
  initialValue: any;
  change?: ((v: any) => void) | null;
  fieldControl?: FormField | FormRangeField;
}

function splitNameToPath(name) {
  return name.replace(/\[/g, '.').replace(/\]/g, '').split('.');
}

function deepVueSet(data: any, name: string, value = null) {
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

const useFormItemControls = () => {
  const formItemInstances: any[] = [];

  function addFormItemInstance(ins: any) {
    if (formItemInstances.includes(ins)) {
      return;
    }
    formItemInstances.push(ins);
  }

  function removeFormItemInstance(ins: any) {
    const index = formItemInstances.indexOf(ins);
    if (index === -1) {
      return;
    }

    formItemInstances.splice(index, 1);
  }

  function resetFormItemNeedReset() {
    // 组件源码黑操作
    formItemInstances.forEach((ins) => {
      if (ins) {
        ins.needResetField = true;
      }
    });
  }

  return {
    addFormItemInstance,
    removeFormItemInstance,
    resetFormItemNeedReset,
  };
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
    const { addFormItemInstance, removeFormItemInstance, resetFormItemNeedReset } = useFormItemControls();
    let initialData = {};
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
      if (gutter) {
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

    function setFieldValue(key: string, value: any, emitChange = true) {
      if (!key) {
        return;
      }

      lodashSet(formData, key, value);
      if (emitChange && formFieldMetas[key] && typeof formFieldMetas[key].change === 'function') {
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

      const initialValue = value === undefined ? lodashGet(initialData, name) : value;

      deepVueSet(formData, name, initialValue);

      let initialSetted = false;
      const formField: FormField = {
        name,
        setValue: (v, emitChange = true) => {
          setFieldValue(name, v, emitChange);
        },
        getValue: () => getFieldValue(name),
        setInitalValue: (v) => {
          if (initialSetted) {
            return;
          }
          if (formFieldMetas[name]) {
            formFieldMetas[name].initialValue = v;
            initialSetted = true;
          }
        },
        setChangeListener: (listener) => {
          if (formFieldMetas[name]) {
            formFieldMetas[name].change = listener;
          }
        },
      };

      formFieldMetas[name] = {
        initialValue,
        fieldControl: formField,
      };

      return formField;
    }

    function initFormRangeField({ name, uid, value }: FormRangeFieldOptions) {
      if (formFieldMetas[uid]) {
        return formFieldMetas[uid].fieldControl as FormRangeField;
      }

      const initValue = value.map((v, i) => {
        const n = name[i];
        const initV = v === undefined && n ? lodashGet(initialData, n) : v;
        if (n) {
          deepVueSet(formData, n, initV);
          formFieldMetas[n] = {
            initialValue: initV,
          };
        }

        return v === undefined && n ? lodashGet(initialData, n) : v;
      });

      deepVueSet(formData, uid, normalizeRangeFieldValue(initValue[0], initValue[1]));
      const [startName, endName] = name;

      let initialSetted = false;
      const formRangeField: FormRangeField = {
        uid,
        name,
        setValue: (index, v, emitChange = true) => {
          if (name[index]) {
            setFieldValue(name[index], v, emitChange);
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

          if (startName && formFieldMetas[startName]) {
            formFieldMetas[startName].initialValue = values[0];
          }

          if (endName && formFieldMetas[endName]) {
            formFieldMetas[endName].initialValue = values[1];
          }

          if (formFieldMetas[uid]) {
            formFieldMetas[uid].initialValue = values;
          }
        },
        setChangeListener: (startListener, endListener) => {
          if (startName && formFieldMetas[startName]) {
            formFieldMetas[startName].change = startListener;
          }

          if (endName && formFieldMetas[endName]) {
            formFieldMetas[endName].change = endListener;
          }
        },
      };

      formFieldMetas[uid] = {
        initialValue: initValue,
        fieldControl: formRangeField,
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

    function setInitalData(d: Record<string, any>) {
      initialData = d || {};
      Object.keys(formFieldMetas).forEach((key) => {
        formFieldMetas[key].initialValue = lodashGet(initialData, key) ?? null;
      });
    }

    provide<FormExtendsContext>(FORM_CONTEXT, {
      labelWidth,
      labelEllipsis: useComputed('labelEllipsis', (v) => !!v),
      setFieldValue,
      getFieldValue,
      removeField,
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
          console.log(gutterSize.value);
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
      [$deletePropList]: ['onReset'],
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
          const onReset = props.get('onReset');
          const resetType = props.get('resetType') || 'empty';

          if (instance.refs.$base) {
            (instance.refs.$base as any).clearValidate();
          }

          Object.keys(formFieldMetas).forEach((key) => {
            if (resetType === 'initial') {
              setFieldValue(key, formFieldMetas[key].initialValue === undefined ? null : formFieldMetas[key].initialValue);
              return;
            }
            setFieldValue(key, null);
          });

          resetFormItemNeedReset();

          if (isFunction(onReset)) {
            onReset();
          }
        },
        setInitalData,
        setFormData,
        getFormData,
        setFieldValue,
        getFieldValue,
      },
    };
  },
};
