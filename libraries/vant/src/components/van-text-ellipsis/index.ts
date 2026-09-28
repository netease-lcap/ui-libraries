import { TextEllipsis as VantTextEllipsis } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';

function VanTextEllipsisRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanTextEllipsis = registerComponent(VantTextEllipsis, {
  plugin: basicPlugin,
  name: 'van-text-ellipsis',
});

export { VanTextEllipsis, VanTextEllipsisRegister, VantTextEllipsis };
export default VanTextEllipsis;
