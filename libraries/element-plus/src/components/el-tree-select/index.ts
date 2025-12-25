import { ElTreeSelect as ElTreeSelectPlus } from 'element-plus';
import _ from 'lodash';
import './index.css';
import { registerComponent } from '../../plugins';
import basicsPlugin from './plugins/index';
import { withFormItem } from '@/components/el-form/plugins/form-item';

function ElTreeSelectRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTreeSelect = registerComponent(ElTreeSelectPlus, { plugin: basicsPlugin });
const ElFormTreeSelect = withFormItem(ElTreeSelect, 'el-form-tree-select');

export { ElTreeSelectPlus, ElTreeSelect, ElFormTreeSelect, ElTreeSelectRegister };
export const ElTreeSelectBasicsPlugin = basicsPlugin;
export default ElTreeSelect;
