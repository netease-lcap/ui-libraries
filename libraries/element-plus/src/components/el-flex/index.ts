import _ from 'lodash';
import Flex from './flex';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/index';

function ElFlexRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElFlex = registerComponent(Flex, { plugin: basicsPlugin, name: 'el-flex' });
export { ElFlexRegister, ElFlex, Flex };
export const ElFlexBasicsPlugin = basicsPlugin;
export default ElFlex;
