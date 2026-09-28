import { TreeSelect as VantTreeSelect } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import { withFormItem } from '@/components/van-form/plugins/form-item';
import * as basicPlugins from './plugins';
import './index.css';

function VanTreeSelectRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanTreeSelect = registerComponent(VantTreeSelect, { plugin: basicPlugins, name: 'van-tree-select' });
const VanFormTreeSelect = withFormItem(VanTreeSelect, 'van-form-tree-select');
export { VanTreeSelectRegister, VanTreeSelect, VanFormTreeSelect, VantTreeSelect };
export default VanTreeSelect;
