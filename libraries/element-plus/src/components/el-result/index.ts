import { ElResult as ElResultPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

function ElResultRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElResult = registerComponent(ElResultPlus, { plugin: basicsPlugin });

export { ElResultPlus, ElResult, ElResultRegister };
export default ElResult;
