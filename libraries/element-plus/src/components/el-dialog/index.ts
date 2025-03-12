import { ElDialog as ElDialogPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-dialog.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElDialog = registerComponent(ElDialogPlus, { plugin: basicsPlugin });
export default ElDialog;
