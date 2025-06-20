import { ElWatermark as ElWatermarkPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

function ElWatermarkRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElWatermark = registerComponent(ElWatermarkPlus, { plugin: basicsPlugin });

export { ElWatermarkPlus, ElWatermark, ElWatermarkRegister };
export default ElWatermark;

