import { ElTable as ElTablePlus, ElTableColumn } from 'element-plus';
import 'element-plus/theme-chalk/el-input.css';
import { registerComponet } from '../../plugins';
import * as basicsPlugin from './plugins/index';

// const ElTable = ElTablePlus;
const ElTable = registerComponet(ElTablePlus, { plugin: basicsPlugin });
export { ElTableColumn, ElTable, ElTablePlus };
export default ElTable;
