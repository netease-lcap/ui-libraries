import { ElSteps as ElStepsPlus, ElStep as ElStepPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-steps.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import * as itemPlugin from './plugins/item-plugins';

export const ElSteps = registerComponent(ElStepsPlus, { plugin: basicsPlugin });
export const ElStep = registerComponent(ElStepPlus, { plugin: itemPlugin });
export default ElSteps;
