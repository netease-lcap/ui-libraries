import { ElCollapse as ElCollapsePlus, ElCollapseItem as ElCollapseItemPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import * as itemPlugins from './plugins/item-plugins';
import './index.less';

function ElCollapseRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElCollapseItemRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(itemPlugins, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElCollapse = registerComponent(ElCollapsePlus, { plugin: basicsPlugin });
const ElCollapseItem = registerComponent(ElCollapseItemPlus, { plugin: itemPlugins });

export { ElCollapsePlus, ElCollapseItemPlus, ElCollapse, ElCollapseItem, ElCollapseRegister, ElCollapseItemRegister };
export default ElCollapse;
