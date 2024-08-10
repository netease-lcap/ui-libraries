/* 仅在 ide 环境生效的插件 */
import { createSlotEmpty } from '@lcap/nasl-hoc-vue/common/lowcode';

export const useSlotEmpty = createSlotEmpty(['default', 'title', 'footer'], false);
