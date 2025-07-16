import { $ide } from '@/plugins/constants';

export function handleEvents(props: any) {
  return {
    onCancel: () => {},
    onConfirm: () => {},
  };
}
handleEvents.type = $ide;
