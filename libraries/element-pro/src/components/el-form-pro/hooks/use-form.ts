import {
  isObject,
  set as lodashSet,
  get as lodashGet,
  cloneDeep,
} from 'lodash';
import { reactive, toRaw } from '@vue/composition-api';
import { type MapGet } from '@lcap/vue2-utils/plugins/types';
import { LCAP_FORM_UID } from '../constants';
import { FormActionType, useFormActionCollect } from './use-form-action-collect';
import {
  FormField,
  FormFieldOptions,
  FormRangeField,
  FormRangeFieldOptions,
} from '../types';
import { deepVueSet, normalizeRangeFieldValue } from '../utils';

export interface FormFieldMata {
  initialValue: any;
  change?: ((v: any) => void) | null;
  fieldControl?: FormField | FormRangeField;
}

export const useForm = (props: MapGet) => {
  const formData = reactive({});
  const formFieldMetas: Record<string, FormFieldMata> = {};

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

    const resetObj = {};

    Object.keys(d).forEach((key) => {
      resetObj[key] = d[key] === undefined ? null : d[key];
    });

    Object.assign(formData, resetObj);

    Object.keys(formFieldMetas).forEach((key) => {
      if (typeof formFieldMetas[key].change !== 'function') {
        return;
      }

      const val = lodashGet(resetObj, key);
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

  const initCollect = useFormActionCollect((actionMap) => {
    const initFields = actionMap[FormActionType.INIT_FIELD] || [];
    const removeFields = actionMap[FormActionType.REMOVE_FIELD];

    if (!removeFields || removeFields.length === 0) {
      return;
    }

    removeFields.filter((n) => !initFields.includes(n)).forEach(removeField);
  });

  function initFormField({ name, value }: FormFieldOptions) {
    initCollect()(FormActionType.INIT_FIELD, name);
    if (formFieldMetas[name]) {
      return formFieldMetas[name].fieldControl as FormField;
    }

    const initialValue = value;

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
        if (formFieldMetas[name] && v !== undefined) {
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
      initialValue: null,
      fieldControl: formField,
    };

    return formField;
  }

  function initFormRangeField({ name, uid, value }: FormRangeFieldOptions) {
    const collect = initCollect();
    [uid, ...name].forEach((key) => {
      if (key) {
        collect(FormActionType.INIT_FIELD, key);
      }
    });

    if (formFieldMetas[uid]) {
      return formFieldMetas[uid].fieldControl as FormRangeField;
    }

    const initValue = value.map((v, i) => {
      const n = name[i];
      const initV = v;
      if (n) {
        deepVueSet(formData, n, initV);
        formFieldMetas[n] = {
          initialValue: null,
        };
      }

      return v;
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
      getValue: (index) => {
        let key = name[index];

        if (!key) {
          key = `${uid}[${index}]`;
        }

        return getFieldValue(key);
      },
      setInitalValue: (values) => {
        if (initialSetted) {
          return;
        }
        initialSetted = true;

        const [startValue, endValue] = values;

        if (startName && formFieldMetas[startName] && startValue !== undefined) {
          formFieldMetas[startName].initialValue = startValue;
        }

        if (endName && formFieldMetas[endName] && endValue !== undefined) {
          formFieldMetas[endName].initialValue = values[1] as any;
        }

        if (formFieldMetas[uid]) {
          formFieldMetas[uid].initialValue = normalizeRangeFieldValue(startValue, endValue);
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
      initialValue: null,
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

  return {
    formData,
    formFieldMetas,
    removeField,
    initFormField,
    initFormRangeField,
    setFieldValue,
    getFieldValue,
    setFormData,
    getFormData,
    removeFieldCollect: (...args: string[]) => {
      initCollect()(FormActionType.REMOVE_FIELD, ...args);
    },
  };
};
