import Steps from 'element-ui/lib/steps';
import Step from 'element-ui/lib/step';
import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElSteps = registerComponent(Steps, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: [],
});
export const ElStep = Step;

export default ElSteps;
