import { ElRow as ElRowPlus, ElCol as ElColPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-row.css';
import 'element-plus/theme-chalk/el-col.css';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import * as columnPlugin from './plugins/col-plugins';

const ElRow = registerComponent(ElRowPlus, { plugin: basicsPlugin });
const ElCol = registerComponent(ElColPlus, { plugin: columnPlugin });
export { ElRow, ElCol };

export default ElRow;
