import { Collapse as VantCollapse, CollapseItem as VantCollapseItem } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';

function VanCollapseRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanCollapse = registerComponent(VantCollapse, { name: 'van-collapse' });
const VanCollapseItem = registerComponent(VantCollapseItem, { name: 'van-collapse-item' });
export { VanCollapseRegister, VanCollapse, VantCollapse, VanCollapseItem, VantCollapseItem };
export default VanCollapse;
