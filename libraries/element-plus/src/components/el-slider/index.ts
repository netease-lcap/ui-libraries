import { ElSlider as ElSliderPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-slider.css';
import './index.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

const ElSlider = registerComponent(ElSliderPlus, { plugin: basicsPlugin });
export { ElSliderPlus, ElSlider };
export default ElSlider;
