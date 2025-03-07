import { ElInputTag as ElInputTagPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-input-tag.css';
import './index.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index.ts';
import { withFormItem } from '../../components/el-form/plugins/form-item';

const ElInputTag = registerComponent(ElInputTagPlus, { plugin: basicsPlugin });
const ElFormInputTag = withFormItem(ElInputTag, 'el-form-input-tag');
export { ElInputTagPlus, ElInputTag, ElFormInputTag };
export default ElInputTag;
