import { ElCascader as ElCascaderPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form';
import './index.css';

const ElCascader = registerComponent(ElCascaderPlus, { plugin: basicsPlugin });
const ElFormCascader = withFormItem(ElCascader, 'el-form-cascader');
export { ElCascader, ElFormCascader };
export default ElCascader;
