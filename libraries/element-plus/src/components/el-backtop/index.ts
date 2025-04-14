import { ElBacktop as ElBacktopPlus } from 'element-plus';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import BacktopDesigner from './designer.vue';

export const ElBacktopDesigner = BacktopDesigner;
export const ElBacktop = registerComponent(ElBacktopPlus, { plugin: basicsPlugin });
export default ElBacktop;
