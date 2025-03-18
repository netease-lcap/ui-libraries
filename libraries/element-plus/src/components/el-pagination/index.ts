import { ElPagination as ElPaginationPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';

import 'element-plus/theme-chalk/el-pagination.css';

export const ElPagination = registerComponent(ElPaginationPlus, { plugin: basicPlugin });
export default ElPagination;
