import { ElDialog as ElDialogPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '../../plugins';
import basicsPlugin from './plugins/basic-plugins';
import './index.css';

function ElDialogRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElDialog = registerComponent(ElDialogPlus, { plugin: basicsPlugin });
export { ElDialogPlus, ElDialog, ElDialogRegister };
export const ElDialogBasicsPlugin = basicsPlugin;
export default ElDialog;
