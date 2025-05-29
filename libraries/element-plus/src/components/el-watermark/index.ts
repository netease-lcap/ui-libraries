import { ElWatermark as ElWatermarkPlus } from 'element-plus';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElWatermark = registerComponent(ElWatermarkPlus, { plugin: basicsPlugin });
export default ElWatermark;

