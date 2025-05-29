import { ElAffix as ElAffixPlus } from 'element-plus';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElAffix = registerComponent(ElAffixPlus, { plugin: basicsPlugin });
export default ElAffix;
