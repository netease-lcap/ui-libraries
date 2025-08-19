import { Signature as VantSignature } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';
import { withFormItem } from '@/components/van-form/plugins/form-item';

function VanSignatureRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanSignature = registerComponent(VantSignature, {
  plugin: basicPlugin,
  name: 'van-signature',
});

const VanFormSignature = withFormItem(VanSignature, 'van-form-signature');
export { VanSignature, VanSignatureRegister, VantSignature, VanFormSignature };
export default VanSignature;
