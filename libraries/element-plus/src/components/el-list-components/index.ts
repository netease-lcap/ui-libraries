import _ from 'lodash';
import ElListComponents from './index.vue';
import { registerComponent } from '@/plugins';

function ElListComponentsRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

ElListComponents.BaseComponent = ElListComponents;

export { ElListComponentsRegister, ElListComponents };
export default ElListComponents;
