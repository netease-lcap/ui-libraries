import { type Plugin } from 'vue';
import * as Components from './components';

export const install: Plugin = (app) => {
  Object.keys(Components).forEach((name) => {
    app.component(name, Components[name]);
  });
};
