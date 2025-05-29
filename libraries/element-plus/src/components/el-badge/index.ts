import { ElBadge as ElBadgePlus } from 'element-plus';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElBadge = registerComponent(ElBadgePlus, { plugin: basicsPlugin });
export default ElBadge;

