import { ElProgress as ElProgressPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

function ElProgressRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElProgress = registerComponent(ElProgressPlus, { plugin: basicsPlugin });

export { ElProgressPlus, ElProgress, ElProgressRegister };
export default ElProgress;
