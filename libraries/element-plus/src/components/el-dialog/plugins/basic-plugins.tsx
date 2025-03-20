import { useControllableValue } from "@/plugins/hooks";

export function handleDialogRef(props) {
  const [_, setValue, valueProps] = useControllableValue(props);
  const ref = props.get('ref');

  return {
    ...valueProps,
    ref: {
      ...ref,
      open: () => setValue(true),
      close: () => setValue(false),
    },
  };
}
