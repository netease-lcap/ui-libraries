import { ElDatePicker as ElDatePickerPlus } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form';


const ElDatePicker = registerComponent(ElDatePickerPlus, { plugin: basicsPlugin });
const ElFormDatePicker = withFormItem(ElDatePicker, 'el-form-date-picker');
export { ElDatePicker, ElFormDatePicker };
export default ElDatePicker;
