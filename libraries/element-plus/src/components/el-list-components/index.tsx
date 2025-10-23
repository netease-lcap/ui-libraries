import _ from 'lodash';
import basicElListComponents from './index.vue';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/index.tsx';
import './index.less';

function ElListComponentsRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElListComponents = registerComponent(basicElListComponents, { plugin: basicsPlugin });

export { ElListComponentsRegister, ElListComponents };
export default ElListComponents;
