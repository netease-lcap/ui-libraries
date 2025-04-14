import { ElTag as ElTagPlus, ElCheckTag as ElCheckTagPlus } from 'element-plus';

import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElTag = registerComponent(ElTagPlus, { plugin: basicsPlugin });
export const ElCheckTag = registerComponent(ElCheckTagPlus, { plugin: basicsPlugin });
export default ElTag;
