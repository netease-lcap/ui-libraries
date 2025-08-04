import { type Plugin } from 'vue';
import { showToast } from 'vant';
// import Vant from 'vant';
import * as Components from './components';

export const install: Plugin = (app) => {
  Object.keys(Components).forEach((name) => {
    app.component(name, Components[name]);
  });
  // 确认是否还有用？vue3应用模板中没有调用$taost了
  app.config.globalProperties.$toast = showToast;
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
