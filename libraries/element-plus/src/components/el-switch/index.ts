import { ElSwitch as ElSwitchPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-switch.css';
import './index.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form/plugins/form-item';

const ElSwitch = registerComponent(ElSwitchPlus, { plugin: basicsPlugin });
const ElFormSwitch = withFormItem(ElSwitch, 'el-form-switch');
export { ElSwitchPlus, ElSwitch, ElFormSwitch };
export default ElSwitch;
