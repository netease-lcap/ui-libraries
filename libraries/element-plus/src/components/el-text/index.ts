import _ from 'lodash';
import { registerComponent } from '@/plugins';
import Text from './text';

function ElTextRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElText = Text;
export { ElTextRegister, ElText };
export default ElText;
