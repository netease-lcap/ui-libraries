import { ElTree as ElTreePlus } from 'element-plus';

import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElTree = registerComponent(ElTreePlus, { plugin: basicsPlugin });

export default ElTree;
