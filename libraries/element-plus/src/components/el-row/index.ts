import { ElRow as ElRowPlus, ElCol as ElColPlus } from 'element-plus';

import { registerComponent } from '@/plugins';
// import * as basicsPlugin from './plugins/index';
import * as columnPlugin from './plugins/col-plugins';

const ElRow = ElRowPlus;
const ElCol = registerComponent(ElColPlus, { plugin: columnPlugin });
export { ElRow, ElCol };

export default ElRow;
