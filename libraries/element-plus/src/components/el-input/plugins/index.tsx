/* eslint-disable no-shadow */

import { useControllableValue } from '@/plugins/hooks';

export { handleComponentInForm } from '@/components/el-form/plugins/form-item';
export * from './ide';

export function handleControllableValue(props: any) {
  return useControllableValue(props).at(-1);
}
