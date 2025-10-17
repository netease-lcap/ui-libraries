import _ from 'lodash';
import { defineComponent } from 'vue';
import ElListComponents from './index.vue';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/index.tsx';
import './index.less';

function ElListComponentsRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign({}, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElListComponentsPlus = registerComponent(ElListComponents, { plugin: basicsPlugin });

export { ElListComponentsRegister, ElListComponents, ElListComponentsPlus };
export default ElListComponents;
