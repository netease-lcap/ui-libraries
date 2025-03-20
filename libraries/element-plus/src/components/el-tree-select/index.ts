import { ElTreeSelect as ElTreeSelectPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-tree-select.css';
import './index.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form/plugins/form-item';

const ElTreeSelect = registerComponent(ElTreeSelectPlus, { plugin: basicsPlugin });
const ElFormTreeSelect = withFormItem(ElTreeSelect, 'el-form-tree-select');
export { ElTreeSelectPlus, ElTreeSelect, ElFormTreeSelect };
export default ElTreeSelect;
