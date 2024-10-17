import { Pagination, PaginationMini } from '@element-pro';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';
import * as miniPlugins from './plugins/mini';

export const ElPaginationPro = registerComponent(Pagination, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export const ElPaginationMiniPro = registerComponent(PaginationMini, miniPlugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});

export default ElPaginationPro;
