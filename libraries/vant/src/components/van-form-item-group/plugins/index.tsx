import _ from 'lodash';
import { useCallback, useState, useEffect, useMemo } from '@/plugins/hooks';
import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/van-form/constants';
import { addClass } from '@/utils';
import {
  handlePropName,
  handleSlotToInputSlot,
  handleRules,
  convertVanFormItemRules,
} from '@/components/van-form/plugins/form-item-plugin';

export { handlePropName, handleSlotToInputSlot, handleRules };

function resolveValidateMessage(error: unknown, fallback = '校验失败') {
  if (_.isError(error)) return error.message || fallback;
  if (_.isString(error) && error) return error;
  if (error && typeof error === 'object' && 'message' in (error as any) && (error as any).message) {
    return String((error as any).message);
  }
  return String(error ?? fallback);
}

function execVanRules(rules: any[], value: any) {
  return (rules ?? []).reduce((promise, rule) => {
    return promise.then(() => {
      if (!rule?.validator) {
        if (rule?.required && (value === undefined || value === null || value === '')) {
          return Promise.reject(new Error(rule.message || '表单项不得为空'));
        }
        return undefined;
      }
      return Promise.resolve(rule.validator(value, rule)).then((result) => {
        if (result === false) {
          return Promise.reject(new Error(rule.message || '校验失败'));
        }
        return result;
      });
    });
  }, Promise.resolve());
}

export function handleValidateValue(props) {
  const value = props.get('value');
  const emit = props.get('emit');
  const deletePropsList = (props.get($deletePropsList) ?? []).concat(['value']);
  return {
    modelValue: _.get(value, 'value', value),
    'onUpdate:modelValue': (next) => emit?.('update:value', next),
    [$deletePropsList]: deletePropsList,
  };
}
handleValidateValue.order = 2;

export function handleGroupSlots(props) {
  const slots = props.get('slots') ?? {};
  const className = props.get('class');
  const defaultSlot = slots.default;
  return {
    class: addClass(className, 'van-form-item-group'),
    slots: _.assign({}, _.omit(slots, ['default']), {
      input: defaultSlot ? () => <div class="van-form-item-group__content">{defaultSlot()}</div> : <div />,
    }),
  };
}
handleGroupSlots.order = 5;

export function handleValidated(props) {
  const emit = props.get('emit');
  const ref = props.get('ref') ?? {};
  const value = props.get('value');
  const rulesProps = props.get('rules') ?? [];
  const name = props.get('name');
  const inject = props.get('inject');
  const [valid, setValid] = useState(true);

  const rules = useMemo(() => convertVanFormItemRules(rulesProps), [rulesProps]);
  const currentValue = _.get(value, 'value', value);

  const validated = useCallback(async () => {
    const { setValue } = inject?.value?.[$formProvide] ?? {};
    setValue?.(name, currentValue);
    try {
      if (typeof ref.validate === 'function') {
        const error = await ref.validate();
        if (error) {
          throw error;
        }
      } else {
        await execVanRules(rules, currentValue);
      }
      setValid(true);
      emit?.('sync:state', 'valid', true);
      return { valid: true };
    } catch (err) {
      setValid(false);
      emit?.('sync:state', 'valid', false);
      return { valid: false, message: resolveValidateMessage(err) };
    }
  }, [currentValue, emit, inject, name, ref, rules]);

  useEffect(() => {
    emit?.('sync:state', 'valid', valid);
  }, [valid]);

  useEffect(() => {
    const { setFormitem, deleteFormitem, isInForm, setValue } = inject?.value?.[$formProvide] ?? {};
    if (!isInForm) return undefined;
    setValue?.(name, currentValue);
    setFormitem?.(name, {
      getModelValue: () => currentValue,
      resetField: () => {},
    });
    return () => deleteFormitem?.(name);
  }, [name, currentValue, inject]);

  return {
    modelValue: currentValue,
    ref: Object.assign(ref, {
      validated,
      get valid() {
        return valid;
      },
    }),
  };
}
handleValidated.order = 5;
