import { Signature as VantSignature } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';

function VanSignatureRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanSignature = registerComponent(VantSignature, {
  plugin: basicPlugin,
  name: 'van-signature',
});

export { VanSignature, VanSignatureRegister, VantSignature };
export default VanSignature;
