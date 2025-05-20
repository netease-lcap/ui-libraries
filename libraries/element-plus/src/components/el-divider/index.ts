import { ElDivider as ElDividerPlus } from 'element-plus';

import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

const ElDivider = registerComponent(ElDividerPlus, { plugin: basicsPlugin });

export { ElDividerPlus, ElDivider };
export default ElDivider;
