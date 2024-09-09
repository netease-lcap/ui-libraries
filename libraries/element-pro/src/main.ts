/* eslint-disable no-param-reassign */
import VueCompositionAPI from '@vue/composition-api';
import * as components from './components';
import './styles/theme.css';
import './styles/variables/index.css';

export * from './components';

let installed = false;
export const install = (Vue) => {
  if (installed) {
    return;
  }

  installed = true;
  Vue.use(VueCompositionAPI);
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key]);
  });
};
