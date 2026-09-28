import { CellGroup as VantCellGroup, Cell as VantCell } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';
import * as cellPlugins from './plugins/cell-plugins';

function VanCellGroupRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function VanCellRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanCellGroup = registerComponent(VantCellGroup, {
  plugin: basicPlugin,
  name: 'van-cell-group',
});

const VanCell = registerComponent(VantCell, {
  plugin: cellPlugins,
  name: 'van-cell',
});

export { VanCellGroup, VanCellGroupRegister, VantCellGroup, VanCell, VanCellRegister, VantCell };
export default VanCellGroup;
