import { $deletePropsList } from '@/plugins/constants';

export function useHandle(props) {
  return {
    setRef: (selfProps, ref) => selfProps,
  };
}
