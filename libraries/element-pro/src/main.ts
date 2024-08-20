/* eslint-disable no-param-reassign */
import './theme.css';
import * as components from './components';

export * from './components';

let installed = false;
export const install = (Vue) => {
  if (installed) {
    return;
  }

  installed = true;
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key]);
  });
};
