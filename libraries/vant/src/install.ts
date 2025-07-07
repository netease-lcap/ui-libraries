import { type Plugin } from 'vue';
// import Vant from 'vant';
import * as Components from './components';

export const install: Plugin = (app) => {
  // app.use(Vant);
  Object.keys(Components).forEach((name) => {
    console.log(name, 'name');
    app.component(name, Components[name]);
  });
};
