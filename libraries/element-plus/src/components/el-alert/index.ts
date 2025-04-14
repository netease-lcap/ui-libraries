import { ElAlert as ElAlertPlus } from 'element-plus';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElAlert = registerComponent(ElAlertPlus, { plugin: basicsPlugin });
export default ElAlert;
