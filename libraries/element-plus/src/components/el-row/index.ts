import { ElRow as ElRowPlus, ElCol as ElColPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
// import * as basicsPlugin from './plugins/index';
import * as columnPlugin from './plugins/col-plugins';

function ElColRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(columnPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElRow = ElRowPlus;
const ElCol = registerComponent(ElColPlus, { plugin: columnPlugin });

ElCol.BaseComponent = ElColPlus;

export { ElRowPlus, ElColPlus, ElRow, ElCol, ElColRegister };