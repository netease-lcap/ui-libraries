import { ElDescriptions as ElDescriptionsPlus, ElDescriptionsItem } from 'element-plus';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/basic-plugins';
import './index.css';

import { ElDescriptionsCell } from './cell';

const ElDescriptions = registerComponent(ElDescriptionsPlus, { plugin: basicPlugin });

export default ElDescriptions;
export { ElDescriptions, ElDescriptionsItem, ElDescriptionsCell };
