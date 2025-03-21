import { type Plugin } from 'vue';
import { ElMessage, vLoading } from 'element-plus';
import * as Components from './components';

export const install: Plugin = (app) => {
  Object.keys(Components).forEach((name) => {
    app.component(name, Components[name]);
  });
  app.directive('loading', vLoading);
  app.config.globalProperties.$message = ElMessage;
};
