import { ElCascader as ElCascaderPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-cascader.css';
import 'element-plus/theme-chalk/el-cascader-panel.css';
import { registerComponet } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form';
import './index.css';

const ElCascader = registerComponet(ElCascaderPlus, { plugin: basicsPlugin });
const ElFormCascader = withFormItem(ElCascader, 'el-form-cascader');
export { ElCascader, ElFormCascader };
export default ElCascader;
