import { ElRadio, ElRadioGroup as ElRadioGroupPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-radio.css';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form';

const ElRadioGroup = registerComponent(ElRadioGroupPlus, { plugin: basicsPlugin });
const ElFormRadioGroup = withFormItem(ElRadioGroup, 'el-form-radio-group');
export { ElRadio, ElRadioGroup, ElFormRadioGroup };
export default ElRadioGroup;
