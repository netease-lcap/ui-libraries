import { Steps as VantSteps, Step as VantStep } from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';
import * as basicItemPlugin from './plugins/item-plugins';

function VanStepsRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function VanStepRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicItemPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanStep = registerComponent(VantStep, {
  plugin: basicItemPlugin,
  name: 'van-step',
});

const VanSteps = registerComponent(VantSteps, {
  plugin: basicPlugin,
  name: 'van-steps',
});

export { VanSteps, VanStepsRegister, VantSteps, VanStep, VantStep, VanStepRegister };
export default VanSteps;
