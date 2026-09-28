import { Toast as VantToast, showToast } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';

function VanToastRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanToast = registerComponent(VantToast, {
  plugin: basicPlugin,
  name: 'van-toast',
});

const Message = {
  info: (msg: string) => {
    showToast({
      type: 'text',
      message: msg,
    });
  },
  error: (msg: string) => {
    showToast({
      type: 'fail',
      message: msg,
    });
  },
};

export { VanToast, VanToastRegister, VantToast, Message };
export default VanToast;
