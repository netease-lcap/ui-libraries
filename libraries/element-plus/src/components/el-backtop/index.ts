import { ElBacktop as ElBacktopPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import BacktopDesigner from './designer.vue';

const ElBacktopDesigner = BacktopDesigner;
function ElBacktopRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElBacktop = registerComponent(ElBacktopPlus, { plugin: basicsPlugin, name: 'el-backtop' });
export { ElBacktopPlus, ElBacktop, ElBacktopRegister, ElBacktopDesigner };
export default ElBacktop;
