import { ElSlider as ElSliderPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-slider.css';
import './index.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form/plugins/form-item';

const ElSlider = registerComponent(ElSliderPlus, { plugin: basicsPlugin });
const ElFormSlider = withFormItem(ElSlider, 'el-form-slider');
export { ElSliderPlus, ElSlider, ElFormSlider };
export default ElSlider;
