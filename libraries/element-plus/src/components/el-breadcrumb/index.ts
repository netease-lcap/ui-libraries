import {
  ElBreadcrumb as ElBreadcrumbPlus,
  ElBreadcrumbItem as ElBreadcrumbItemPlus,
  BreadcrumbItemProps,
} from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import * as itemPlugins from './plugins/item-plugins';

function ElBreadcrumbRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElBreadcrumbItemRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(itemPlugins, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElBreadcrumb = registerComponent(ElBreadcrumbPlus, { plugin: basicsPlugin, name: 'el-breadcrumb' });
const ElBreadcrumbItem = registerComponent<BreadcrumbItemProps>(ElBreadcrumbItemPlus, {
  plugin: itemPlugins,
});

export {
  ElBreadcrumbPlus,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElBreadcrumbRegister,
  ElBreadcrumbItemRegister,
  ElBreadcrumbItemPlus,
};
export default ElBreadcrumb;
