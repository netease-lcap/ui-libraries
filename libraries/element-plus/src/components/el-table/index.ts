import { ElTable as ElTablePlus, ElTableColumn } from 'element-plus';
import 'element-plus/theme-chalk/el-input.css';
import { registerComponet } from '../../plugins';
import * as basicsPlugin from './plugins/index';

// const ElInput = ElInputPlus;
const ElTable = registerComponet(ElTablePlus, { plugin: basicsPlugin });
export { ElTableColumn, ElTable };
export default ElTable;
