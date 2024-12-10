import { type Plugin } from 'vue';
import 'element-plus/theme-chalk/base.css';
import * as Components from './components';

export * from './components';

export const install: Plugin = (app, options) => {
  Object.keys(Components).forEach((name) => {
    app.component(name, Components[name]);
  });
};

export default {
  install,
} as Plugin;
