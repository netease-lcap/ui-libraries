import { ElProgress as ElProgressPlus } from 'element-plus';

import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElProgress = registerComponent(ElProgressPlus, { plugin: basicsPlugin });

export default ElProgress;
