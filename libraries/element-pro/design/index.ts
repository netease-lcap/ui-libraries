import { VueConstructor } from 'vue';
import * as components from './components';

function install(Vue: VueConstructor, config?: object) {
  Object.keys(components).forEach((key) => {
    if (components[key]) {
      if (/directive/i.test(key)) return;
      /plugin/i.test(key) ? Vue.use(components[key]) : Vue.use(components[key], config);
    }
  });
}

export * from './components';
export default {
  install,
};
