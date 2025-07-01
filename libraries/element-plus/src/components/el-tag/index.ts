import { ElTag as ElTagPlus, ElCheckTag as ElCheckTagPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';

function ElTagRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElCheckTagRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElTag = registerComponent(ElTagPlus, { plugin: basicsPlugin, name: 'el-tag' });
const ElCheckTag = registerComponent(ElCheckTagPlus, { plugin: basicsPlugin, name: 'el-check-tag' });

export { ElTagPlus, ElCheckTagPlus, ElTag, ElCheckTag, ElTagRegister, ElCheckTagRegister };
export default ElTag;
