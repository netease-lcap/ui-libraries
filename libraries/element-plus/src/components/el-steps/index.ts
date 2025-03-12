import { ElSteps as ElStepsPlus, ElStep as ElStepPlus } from 'element-plus';
import 'element-plus/theme-chalk/el-steps.css';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElSteps = registerComponent(ElStepsPlus, { plugin: basicsPlugin });
export const ElStep = ElStepPlus;
export default ElSteps;
