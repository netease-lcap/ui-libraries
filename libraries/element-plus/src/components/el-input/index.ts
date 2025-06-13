import { ElInput as ElInputPlus } from 'element-plus';
import './index.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form/plugins/form-item';

const ElInput = registerComponent(ElInputPlus, { plugin: basicsPlugin, name: 'ElInput' });
const ElFormInput = withFormItem(ElInput, 'el-form-input');
export { ElInputPlus, ElInput, ElFormInput };
export default ElInput;
