import { Collapse as VantCollapse, CollapseItem as VantCollapseItem } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';
import * as itemPlugin from './plugins/item';
import './index.css';

function VanCollapseRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanCollapse = registerComponent(VantCollapse, { plugin: basicPlugin });
const VanCollapseItem = registerComponent(VantCollapseItem, { plugin: itemPlugin });
export { VanCollapseRegister, VanCollapse, VantCollapse, VanCollapseItem, VantCollapseItem };
export default VanCollapse;
