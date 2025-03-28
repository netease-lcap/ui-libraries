import { ElTimeSelect as ElTimeSelectPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';
import { withFormItem } from '@/components/el-form/plugins/form-item';
import 'element-plus/theme-chalk/el-time-select.css';

const ElTimeSelect = registerComponent(ElTimeSelectPlus, {
  plugin: basicPlugin,
});

const ElFormTimeSelect = withFormItem(ElTimeSelect, 'el-form-time-select');

export default ElTimeSelect;

export { ElTimeSelect, ElFormTimeSelect };
