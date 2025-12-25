import { ElPageHeader as ElPageHeaderPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicsPlugin from './plugins/index';
import './index.less';

function ElPageHeaderRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElPageHeader = registerComponent(ElPageHeaderPlus, { plugin: basicsPlugin, name: 'el-page-header' });

export { ElPageHeaderPlus, ElPageHeader, ElPageHeaderRegister };
export const ElPageHeaderBasicsPlugin = basicsPlugin;
export default ElPageHeader;
