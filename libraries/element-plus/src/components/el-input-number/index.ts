import { ElInputNumber as ElInputNumberPlus } from 'element-plus';
import _ from 'lodash';
import './index.css';
import { registerComponent } from '../../plugins';
import basicsPlugin from './plugins/index';
import { $deletePropsList } from '@/plugins/constants';
import { withFormItem } from '../../components/el-form/plugins/form-item';

function ElInputNumberRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElInputNumber = registerComponent(ElInputNumberPlus, { plugin: basicsPlugin, name: 'el-input-number' });
const ElFormInputNumber = withFormItem(ElInputNumber, 'el-form-input-number');

export { ElInputNumberPlus, ElInputNumber, ElFormInputNumber, ElInputNumberRegister };
export const ElInputNumberBasicsPlugin = basicsPlugin;
export default ElInputNumber;
