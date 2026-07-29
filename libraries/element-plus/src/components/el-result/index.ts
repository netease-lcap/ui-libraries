import { ElResult as ElResultPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/basic-plugins';

function ElResultRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElResult = registerComponent(ElResultPlus, { plugin: basicsPlugin, name: 'el-result' });

export { ElResultPlus, ElResult, ElResultRegister };
export const ElResultBasicsPlugin = basicsPlugin;
export default ElResult;
