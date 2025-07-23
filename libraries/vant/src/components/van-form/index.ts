import { Form as VantForm } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';
import './index.css';

function VanFormRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanForm = registerComponent(VantForm, {
  plugin: basicPlugin,
  name: 'van-form',
});

export { VanForm, VanFormRegister, VantForm };
export default VanForm; 