import { ElAffix as ElAffixPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';

function ElAffixRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin, name: 'el-affix' });
}

const ElAffix = registerComponent(ElAffixPlus, { plugin: basicsPlugin, name: 'el-affix' });

export { ElAffixPlus, ElAffix, ElAffixRegister };
export default ElAffix;
