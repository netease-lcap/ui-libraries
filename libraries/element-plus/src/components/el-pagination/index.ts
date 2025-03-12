import { ElPagination } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';

import 'element-plus/theme-chalk/el-pagination.css';

export const ElPaginationPlus = registerComponent(ElPagination, { plugin: basicPlugin });
export default ElPaginationPlus;
