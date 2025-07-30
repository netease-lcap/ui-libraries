import { type Plugin } from 'vue';
import ElementPlus, { ElMessage } from 'element-plus';

import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as Components from './components';

// console.log(provideGlobalConfig, 'provideGlobalConfig');

export const install: Plugin = (app) => {
  app.use(ElementPlus, {
    locale: zhCn,
  });
  Object.keys(Components).forEach((name) => {
    app.component(name, Components[name]);
  });
  app.config.globalProperties.$message = ElMessage;
};
