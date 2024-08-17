import Breadcrumb from 'element-ui/lib/breadcrumb';
import BreadcrumbItem from 'element-ui/lib/breadcrumb-item';
import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';
import * as itemPlugins from './plugins/item-plugins';

export const ElBreadcrumb = registerComponent(Breadcrumb, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});
export const ElBreadcrumbItem = registerComponent(BreadcrumbItem, itemPlugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});

export default ElBreadcrumb;
