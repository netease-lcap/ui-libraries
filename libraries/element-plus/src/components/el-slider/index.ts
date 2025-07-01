import { ElSlider as ElSliderPlus } from 'element-plus';
import _ from 'lodash';
import './index.css';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form/plugins/form-item';

function ElSliderRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElSlider = registerComponent(ElSliderPlus, { plugin: basicsPlugin, name: 'el-slider' });
const ElFormSlider = withFormItem(ElSlider, 'el-form-slider');

export { ElSliderPlus, ElSlider, ElFormSlider, ElSliderRegister };
export default ElSlider;
