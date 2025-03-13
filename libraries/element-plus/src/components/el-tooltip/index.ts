import { ElTooltip as ElTooltipPlus } from 'element-plus';

import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';

export const ElTooltip = registerComponent(ElTooltipPlus, { plugin: basicsPlugin });

export default ElTooltip;
