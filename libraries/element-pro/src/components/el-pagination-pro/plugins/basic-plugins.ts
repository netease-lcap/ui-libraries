import { createUseUpdateSync } from '@lcap/vue2-utils';

export const useUpdateSync = createUseUpdateSync([
  { name: 'current', event: 'current-change' },
  { name: 'pageSize', event: 'page-size-change' },
]);
