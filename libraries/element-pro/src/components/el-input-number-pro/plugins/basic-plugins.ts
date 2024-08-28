import { createUseUpdateSync } from '@lcap/vue2-utils';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change' }]);
