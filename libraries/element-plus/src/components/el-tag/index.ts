import { ElTag as ElTagPlus } from 'element-plus';

import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElTag = registerComponent(ElTagPlus, { plugin: basicsPlugin });

export default ElTag;

