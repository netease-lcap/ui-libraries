import { ElTable as ElTablePlus, ElTableColumn as ElTableColumnPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-input.css';
import { registerComponet } from '../../plugins';

import * as basicsPlugin from './plugins/index';
import * as columnPlugin from './plugins/column';
import './index.css';

// const ElTable = ElTablePlus;
const ElTable = registerComponet(ElTablePlus, { plugin: basicsPlugin });
const ElTableColumn = registerComponet(ElTableColumnPlus, { plugin: columnPlugin });
export { ElTableColumn, ElTable, ElTablePlus };
export default ElTable;
