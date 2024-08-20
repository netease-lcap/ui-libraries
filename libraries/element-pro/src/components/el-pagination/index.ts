import { Pagination, PaginationMini } from '@element-pro';
import { registerComponent } from '@/plugins';
import * as plugins from './plugins';

export const ElPaginationPro = registerComponent(Pagination, plugins, {
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
});
export const ElPaginationMiniPro = PaginationMini;

export default ElPaginationPro;
