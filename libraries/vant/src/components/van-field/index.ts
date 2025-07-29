import { Field as VantField } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import { withFormItem } from '@/components/van-form/plugins/form-item';
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

const VanFormField = withFormItem(VanField, 'van-form-field');

export { VanField, VanFieldRegister, VantField, VanFormField };
export default VanField;
