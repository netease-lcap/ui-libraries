import { Image as VantImage } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';

function VanImageRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanImage = registerComponent(VantImage, {
  plugin: basicPlugin,
  name: 'van-image',
});

export { VanImage, VanImageRegister, VantImage };
export default VanImage;
