import { Notify as VantNotify } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';

function VanNotifyRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanNotify = registerComponent(VantNotify, {
  plugin: basicPlugin,
  name: 'van-notify',
});

export { VanNotify, VanNotifyRegister, VantNotify };
export default VanNotify;
