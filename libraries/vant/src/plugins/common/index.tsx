import _ from 'lodash';
import { CUSTOM_FIELD_INJECTION_KEY } from '@vant/use';
import { inject } from 'vue';
import { useMemo, useControllableValue } from '@/plugins/hooks';

export function handleControllableValue(props: any) {
  const ref = props.get('ref');
  const field = useMemo(() => inject(CUSTOM_FIELD_INJECTION_KEY, null), []);
  const [, setValue, valueProps] = useControllableValue(props, {
    onChange: (value, triggerChange) => {
      _.set(field, 'customValue.value', () => value);
      field?.resetValidation?.();
      !triggerChange && field?.validateWithTrigger?.('onChange');
    },
  });

  return {
    ...valueProps,
    ref: Object.assign(ref, {
      resetField: () => setValue(undefined, true),
    }),
  };
}

handleControllableValue.order = 2;
