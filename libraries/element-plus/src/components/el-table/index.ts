import { ElTable as ElTablePlus, ElTableColumn as ElTableColumnPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-input.css';
import { registerComponent } from '../../plugins';

import * as basicsPlugin from './plugins/index';
import * as columnPlugin from './plugins/column';
import './index.css';

// const ElTable = ElTablePlus;
const ElTable = registerComponent(ElTablePlus, { plugin: basicsPlugin });
const ElTableColumn = registerComponent(ElTableColumnPlus, { plugin: columnPlugin });
export { ElTableColumn, ElTable, ElTablePlus };
export default ElTable;
