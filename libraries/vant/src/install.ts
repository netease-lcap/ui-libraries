import { type Plugin } from 'vue';
import { showToast } from 'vant';
// import Vant from 'vant';
import * as Components from './components';

/**
 * Setup Vant app configuration
 * without registering components.
 * @param app
 */
export const setupAppConfiguration: Plugin = (app) => {
  app.config.globalProperties.$message = {
    info: (msg: string) => {
      showToast({
        type: 'text',
        message: msg,
      });
    },
    error: (msg: string) => {
      showToast({
        type: 'fail',
        message: msg,
      });
    },
  };
};

export const install: Plugin = (app) => {
  setupAppConfiguration(app);

  Object.keys(Components).forEach((name) => {
    app.component(name, Components[name]);
  });
};
