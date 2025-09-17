import { ElRate as ElRatePlus } from 'element-plus';
import _ from 'lodash';
import './index.css';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form/plugins/form-item';

function ElRateRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElRate = registerComponent(ElRatePlus, { plugin: basicsPlugin, name: 'el-rate' });
const ElFormRate = withFormItem(ElRate, 'el-form-rate');

export { ElRatePlus, ElRate, ElFormRate, ElRateRegister };
export default ElRate;
