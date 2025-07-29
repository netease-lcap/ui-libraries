import { ActionSheet as VantActionSheet } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';

function VanActionSheetRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanActionSheet = registerComponent(VantActionSheet, {
  plugin: basicPlugin,
  name: 'van-action-sheet',
});

export { VanActionSheet, VanActionSheetRegister, VantActionSheet };
export default VanActionSheet;
