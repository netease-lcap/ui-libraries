/* eslint-disable no-param-reassign */
import VueCompositionAPI from '@vue/composition-api';
import './theme.css';
import * as components from './components';

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
