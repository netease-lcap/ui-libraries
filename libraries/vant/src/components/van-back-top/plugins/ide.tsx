import { $ide } from '@/plugins/constants';

export function handleBackTopShow() {
  return {
    class: 'van-back-top--active',
  };
}
handleBackTopShow.type = $ide;
