import { useControllableValue } from '@/plugins/hooks';
import { $deletePropsList } from '@/plugins/constants';

export function handleControllableValue(props: any) {
  const ref = props.get('ref');
  const [, setValue, valueProps] = useControllableValue(props);
  const deletePropsList = props.get($deletePropsList).concat('setValue');
  return {
    ...valueProps,
    ref: Object.assign(ref, {
      resetField: () => setValue(undefined),
    }),
    setValue,
    [$deletePropsList]: deletePropsList,
  };
}

handleControllableValue.order = 2;
