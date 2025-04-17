import { ElResult as ElResultPlus } from 'element-plus';

import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElResult = registerComponent(ElResultPlus, { plugin: basicsPlugin });

export default ElResult;
