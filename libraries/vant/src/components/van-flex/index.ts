import _ from 'lodash';
import Flex from './flex';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';

function VanFlexRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanFlex = registerComponent(Flex, {
  plugin: basicPlugin,
  name: 'van-flex',
});

export { VanFlexRegister, VanFlex, Flex };
export default VanFlex;