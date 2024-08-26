/* 组件功能扩展插件 */
import { createUseUpdateSync } from '@lcap/vue2-utils';

export const useUpdateSync = createUseUpdateSync([{ name: 'value', event: 'change' }]);
