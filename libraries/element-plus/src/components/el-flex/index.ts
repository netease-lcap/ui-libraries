import _ from 'lodash';
import Flex from './flex';
import { registerComponent } from '@/plugins';
// import * as basicsPlugin from './plugins/index';

function ElFlexRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElFlex = Flex;
ElFlex.BaseComponent = Flex;
export { ElFlexRegister, ElFlex, Flex };
export default ElFlex;
