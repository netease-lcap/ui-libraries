import { ElRate as ElRatePlus } from 'element-plus';
import 'element-plus/theme-chalk/el-rate.css';
import './index.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form/plugins/form-item';

const ElRate = registerComponent(ElRatePlus, { plugin: basicsPlugin });
const ElFormRate = withFormItem(ElRate, 'el-form-rate');
export { ElRatePlus, ElRate, ElFormRate };
export default ElRate;
