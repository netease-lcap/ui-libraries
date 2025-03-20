import { ElInputNumber as ElInputNumberPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-input-number.css';
import './index.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index.ts';
import { withFormItem } from '../../components/el-form/plugins/form-item';

const ElInputNumber = registerComponent(ElInputNumberPlus, { plugin: basicsPlugin });
const ElFormInputNumber = withFormItem(ElInputNumber, 'el-form-input-number');
export { ElInputNumberPlus, ElInputNumber, ElFormInputNumber };
export default ElInputNumber;
