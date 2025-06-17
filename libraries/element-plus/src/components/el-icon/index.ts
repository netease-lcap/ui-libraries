import _ from 'lodash';
import { registerComponent } from '@/plugins';
// import * as basicsPlugin from './plugins/index';
import Icon from './icon';

function ElIconRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElIcon = Icon;
ElIcon.BaseComponent = Icon;
export { ElIconRegister, ElIcon, Icon };
export default ElIcon;
