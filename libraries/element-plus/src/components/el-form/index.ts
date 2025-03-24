import { ElForm as ElFormPlus, ElFormItem as ElFormItemPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-select.css';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import * as formItemPlugin from './plugins/form-item-plugin';
import { withFormItem } from './plugins/form-item';

const ElForm = registerComponent(ElFormPlus, { plugin: basicsPlugin });
const ElFormItemWrap = registerComponent(ElFormItemPlus, { plugin: formItemPlugin });
const ElFormItem = ElFormItemPlus;

export { ElForm, ElFormItemWrap, withFormItem, ElFormItem };
export default ElForm;
