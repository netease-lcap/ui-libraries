import { ElDialog as ElDialogPlus } from 'element-plus';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElDialog = registerComponent(ElDialogPlus, { plugin: basicsPlugin });
export default ElDialog;
