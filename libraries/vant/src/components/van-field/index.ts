import { Field as VantField } from 'vant';
import _ from 'lodash';
import { defineComponent } from 'vue';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins';
import './index.css';

function VanFieldRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanField = registerComponent(VantField, {
  plugin: basicPlugin,
  name: 'van-field',
});

export { VanField, VanFieldRegister, VantField };
export default VanField;
