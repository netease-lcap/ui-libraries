import { ElPagination as ElPaginationPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';

function ElPaginationRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElPagination = registerComponent(ElPaginationPlus, { plugin: basicPlugin });


export { ElPaginationPlus, ElPagination, ElPaginationRegister };
export default ElPagination;
