import { Field } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';
import './index.less';

function VanFormItemGroupRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanFormItemGroup = registerComponent(Field, {
  plugin: basicPlugin,
  name: 'van-form-item-group',
});

export { VanFormItemGroup, VanFormItemGroupRegister };
export default VanFormItemGroup;
