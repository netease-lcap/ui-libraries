import { Popup as VantPopup } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';

function VanPopupRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanPopup = registerComponent(VantPopup, {
  plugin: basicPlugin,
  name: 'van-popup',
});

export { VanPopup, VanPopupRegister, VantPopup };
export default VanPopup;
