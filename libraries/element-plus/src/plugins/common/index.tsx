import { useControllableValue } from '@/plugins/hooks';

export function handleControllableValue(props: any) {
  const ref = props.get('ref');
  const [, setValue, valueProps] = useControllableValue(props);
  return {
    ...valueProps,
    ref: Object.assign(ref, {
      resetField: () => setValue(undefined),
    }),
    setValue,
  };
}

handleControllableValue.order = 2;
