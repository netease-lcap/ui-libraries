import _ from 'lodash';
import VusionValidator, { localizeRules } from '@lcap/validator';
import { useCallback, useState, useControllableValue, useEffect } from '@/plugins/hooks';
import { $deletePropsList } from '@/plugins/constants';
import { $formProvide } from '@/components/van-form/constants';
import { addClass } from '@/utils';
import { handlePropName, handleSlotToInputSlot, handleRules } from '@/components/van-form/plugins/form-item-plugin';

export { handlePropName, handleSlotToInputSlot, handleRules };

export function handleValidateValue(props) {
  const originRules = props.get('rules') ?? [];
  const deletePropsList = (props.get($deletePropsList) ?? []).concat(['value', 'originRules']);
  return {
    originRules,
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
  const rulesProps = props.get('originRules') ?? [];
  const name = props.get('name');
  const inject = props.get('inject');
  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const validated = useCallback(async () => {
    const validator = new (VusionValidator as any)(undefined, localizeRules, rulesProps);
    try {
      await validator.validate(_.get(value, 'value', value));
      setValid(true);
      setErrorMessage('');
      emit?.('sync:state', 'valid', true);
      return { valid: true };
    } catch (err) {
      const message = _.isError(err) ? err.message : String(err ?? '校验失败');
      setValid(false);
      setErrorMessage(message);
      emit?.('sync:state', 'valid', false);
      return { valid: false };
    }
  }, [rulesProps, value, emit]);

  useEffect(() => {
    emit?.('sync:state', 'valid', valid);
  }, [valid]);

  useEffect(() => {
    const { setFormitem, deleteFormitem, isInForm, setValue } = inject?.value?.[$formProvide] ?? {};
    if (!isInForm) return undefined;
    setValue?.(name, value);
    setFormitem?.(name, {
      getModelValue: () => value,
      resetField: () => {},
      validated,
    });
    return () => deleteFormitem?.(name);
  }, [name, value, validated, inject]);

  return {
    errorMessage,
    ref: Object.assign(ref, {
      validated,
      get valid() {
        return valid;
      },
    }),
  };
}
handleValidated.order = 5;
