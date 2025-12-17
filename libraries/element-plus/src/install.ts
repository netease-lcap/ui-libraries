import { type Plugin } from 'vue';
import ElementPlus, { ElMessage, vLoading } from 'element-plus';

import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as Components from './components';

// console.log(provideGlobalConfig, 'provideGlobalConfig');

/**
 * Setup Element Plus app configuration
 * without registering components.
 * @param app
 */
export const setupAppConfiguration: Plugin = (app) => {
  app.use(ElementPlus, {
    locale: zhCn,
  });
  app.directive('loading', vLoading);

  app.config.globalProperties.$message = ElMessage;
};

export const install: Plugin = (app) => {
  setupAppConfiguration(app);

  Object.keys(Components).forEach((name) => {
    app.component(name, Components[name]);
  });
};
