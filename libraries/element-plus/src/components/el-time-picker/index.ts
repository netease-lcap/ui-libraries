import { ElTimePicker as ElTimePickerPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';

import 'element-plus/theme-chalk/el-time-picker.css';

const ElTimePicker = registerComponent(ElTimePickerPlus, {
  plugin: basicPlugin,
});
export default ElTimePicker;

export { ElTimePicker };
