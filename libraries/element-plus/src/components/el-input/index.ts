import { ElInput as ElInputPlus } from 'element-plus';
import _ from 'lodash';
import './index.css';
import { registerComponent } from '../../plugins';
import basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form/plugins/form-item';

function ElInputRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElInput = registerComponent(ElInputPlus, { plugin: basicsPlugin, name: 'el-input' });
const ElFormInput = withFormItem(ElInput, 'el-form-input');

export { ElInputPlus, ElInput, ElFormInput, ElInputRegister };
export default ElInput;
