import { ElSteps as ElStepsPlus, ElStep as ElStepPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/basic-plugins';
import { $deletePropsList } from '@/plugins/constants';
import itemPlugin from './plugins/item-plugins';

function ElStepsRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElStepRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(itemPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElSteps = registerComponent(ElStepsPlus, { plugin: basicsPlugin, name: 'el-steps' });
const ElStep = registerComponent(ElStepPlus, { plugin: itemPlugin, name: 'el-step' });

export { ElStepsPlus, ElStepPlus, ElSteps, ElStep, ElStepsRegister, ElStepRegister };
export const ElStepsBasicsPlugin = basicsPlugin;
export const ElStepBasicsPlugin = itemPlugin;
export default ElSteps;
