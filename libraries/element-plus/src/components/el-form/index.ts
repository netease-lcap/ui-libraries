import { ElForm as ElFormPlus, ElFormItem as ElFormItemPlus } from 'element-plus';
// import { ElForm as ElFormPlus, ElFormItem } from 'element-plus';
import 'element-plus/theme-chalk/el-select.css';
import { registerComponet } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import * as formItemPlugin from './plugins/form-item';

// const formProvide=Stor

const ElForm = registerComponet(ElFormPlus, { plugin: basicsPlugin });
const ElFormItem = registerComponet(ElFormItemPlus, { plugin: formItemPlugin });
// const ElSelect = ElSelectVPlus;
// const ElForm = ElFormPlus;
export { ElForm, ElFormItem };
export default ElForm;
