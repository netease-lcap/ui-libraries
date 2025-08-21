import _ from 'lodash';
import { CUSTOM_FIELD_INJECTION_KEY } from '@vant/use';
import { inject } from 'vue';
import { useEffect, useMemo, useControllableValue } from '@/plugins/hooks';

export function handleControllableValue(props: any) {
  const ref = props.get('ref');
  const defaultValue = props.get('defaultValue');
  const field = useMemo(() => inject(CUSTOM_FIELD_INJECTION_KEY, null), []);
  const [value, setValue, valueProps] = useControllableValue(props, {
    defaultValue,
    onChange: (value, triggerChange) => {
      // _.set(field, 'customValue.value', () => value);
      field?.resetValidation?.();
      !triggerChange && field?.validateWithTrigger?.('onChange');
    },
  });
  useEffect(() => {
    _.set(field, 'customValue.value', () => value);
    field?.validateWithTrigger?.('onChange');
  }, [value]);

  return {
    ...valueProps,
    ref: Object.assign(ref, {
      resetField: () => {
        return setValue(undefined, true);
      },
    }),
  };
}

handleControllableValue.order = 2;
