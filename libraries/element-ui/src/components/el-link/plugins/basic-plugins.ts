/* 组件功能扩展插件 */
import { createProp2Default } from '@lcap/vue2-utils/plugins/common/text';

import { createVueRouterNavigate } from '@lcap/vue2-utils/plugins/index';

export { useLink } from '@lcap/vue2-utils/plugins/index';

export const useText2Default = createProp2Default('text');

export const clickHref = createVueRouterNavigate();
