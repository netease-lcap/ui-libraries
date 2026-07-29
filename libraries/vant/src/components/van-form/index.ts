import { Form as VantForm, Field } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';
import * as formItemPlugin from './plugins/form-item-plugin';
import './index.css';

function VanFormRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanForm = registerComponent(VantForm, {
  plugin: basicPlugin,
  name: 'van-form',
});

const VanFormItem = registerComponent(Field, {
  plugin: formItemPlugin,
  name: 'van-form-item',
});

export { VanForm, VanFormRegister, VantForm, VanFormItem };
export default VanForm;
