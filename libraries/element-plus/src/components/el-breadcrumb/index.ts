import { ElBreadcrumb as ElBreadcrumbPlus, ElBreadcrumbItem as ElBreadcrumbItemPulus } from 'element-plus';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import * as itemPlugins from './plugins/item-plugins';

const ElBreadcrumb = registerComponent(ElBreadcrumbPlus, { plugin: basicsPlugin });
const ElBreadcrumbItem = registerComponent(ElBreadcrumbItemPulus, { plugin: itemPlugins });
export { ElBreadcrumb, ElBreadcrumbItem };
export default ElBreadcrumb;
