import { ElTimeSelect as ElTimeSelectPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';

import 'element-plus/theme-chalk/el-time-select.css';

const ElTimeSelect = registerComponent(ElTimeSelectPlus, {
  plugin: basicPlugin,
});
export default ElTimeSelect;

export { ElTimeSelect };
