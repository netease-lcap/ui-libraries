import { ElDescriptions as ElDescriptionsPlus, ElDescriptionsItem } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';
import './index.css';

import 'element-plus/theme-chalk/el-descriptions.css';
import 'element-plus/theme-chalk/el-descriptions-item.css';
import { ElDescriptionsCell } from './cell';
const ElDescriptions = registerComponent(ElDescriptionsPlus, { plugin: basicPlugin });

export default ElDescriptions;
export { ElDescriptions, ElDescriptionsItem, ElDescriptionsCell };