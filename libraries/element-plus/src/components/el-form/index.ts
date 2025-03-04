import { ElForm as ElFormPlus, ElFormItem as ElFormItemPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-select.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from './plugins/form-item';

const ElForm = registerComponent(ElFormPlus, { plugin: basicsPlugin });
const ElFormItem = ElFormItemPlus;
const ElFormItemPro = ElFormItem;

export { ElForm, ElFormItem, withFormItem, ElFormItemPro };
export default ElForm;
