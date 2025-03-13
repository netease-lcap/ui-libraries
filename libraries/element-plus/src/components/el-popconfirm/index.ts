import { ElPopconfirm as ElPopconfirmPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-popconfirm.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElPopconfirm = registerComponent(ElPopconfirmPlus, { plugin: basicsPlugin });
export default ElPopconfirm;
