import { ElInput as ElInputPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-input.css';
import './index.css';
import { registerComponet } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form/plugins/form-item';

const ElInput = registerComponet(ElInputPlus, { plugin: basicsPlugin });
const ElFormInput = withFormItem(ElInput, 'el-form-input');
export { ElInputPlus, ElInput, ElFormInput };
export default ElInput;
