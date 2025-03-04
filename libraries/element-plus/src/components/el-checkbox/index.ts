import { ElCheckbox, ElCheckboxGroup as ElCheckboxGroupPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-checkbox.css';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form';

const ElCheckboxGroup = registerComponent(ElCheckboxGroupPlus, { plugin: basicsPlugin });
const ElFormCheckboxGroup = withFormItem(ElCheckboxGroup, 'el-form-checkbox-group');
export { ElCheckbox, ElCheckboxGroup, ElFormCheckboxGroup };
export default ElCheckboxGroup;
