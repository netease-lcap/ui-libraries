import { ElTimePicker as ElTimePickerPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';
import { withFormItem } from '@/components/el-form';

import 'element-plus/theme-chalk/el-time-picker.css';

const ElTimePicker = registerComponent(ElTimePickerPlus, {
  plugin: basicPlugin,
});

const ElFormTimePicker = withFormItem(ElTimePicker, 'el-time-picker');

export default ElTimePicker;

export { ElTimePicker, ElFormTimePicker };
