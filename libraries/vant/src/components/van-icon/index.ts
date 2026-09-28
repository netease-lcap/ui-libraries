import _ from 'lodash';
import { registerComponent } from '@/plugins';
import './index.css';
import Icon from './icon';

function VanIconRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanIcon = Icon;
export { VanIconRegister, VanIcon, Icon };
export default VanIcon;
