import { Dialog as VantDialog } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';

function VanDialogRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanDialog = registerComponent(VantDialog, {
  plugin: basicPlugin,
  name: 'van-dialog',
});

export { VanDialog, VanDialogRegister, VantDialog };
export default VanDialog;
