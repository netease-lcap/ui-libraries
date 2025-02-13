import { ElSelect as ElSelectV2Plus, ElOption } from 'element-plus';
import 'element-plus/theme-chalk/el-select.css';
import { registerComponet } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form/plugins/form-item';
import './index.css';

const ElSelect = registerComponet(ElSelectV2Plus, { plugin: basicsPlugin });
const ElFormSelect = withFormItem(ElSelect, 'el-form-select');
// const ElSelect = ElSelectV2Plus;
export { ElSelect, ElOption, ElFormSelect };
export default ElSelect;
